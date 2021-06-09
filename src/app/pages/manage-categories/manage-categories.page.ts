import {Component} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {CategoriesService, ICategory} from '../../services/categories/categories.service';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs/src/internal/Subscription';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.page.html',
  styleUrls: ['./manage-categories.page.scss'],
})
export class ManageCategoriesPage {

  searchTextAction: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchText$: Observable<string> = this.searchTextAction.asObservable();
  categories$: Observable<ICategory[]>;
  categories: ICategory[] = [];
  private categoriesSubscription: Subscription;
  private loadingScreen: HTMLIonLoadingElement;

  constructor(
    public categoriesService: CategoriesService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public navParams: NavParams
  ) {
    this.showLoadingScreen();
  }

  async showLoadingScreen() {
    this.loadingScreen = await this.loadingCtrl.create({
      message: `Please wait`,
      duration: null
    });
    await this.loadingScreen.present();
  }

  ionViewWillEnter() {
    this.categories$ = combineLatest(this.categoriesService.categories$, this.searchText$).pipe(
      switchMap(value => {
        return of(value[0].filter(d => {
          return d.label.trim().toLowerCase().indexOf(value[1].trim().toLowerCase()) >= 0;
        }));
      })
    );
    // @ts-ignore
    this.categoriesSubscription = this.categoriesService.categories$.subscribe(value => {
      this.categories = value;
      this.loadingScreen.dismiss();
    });
  }

  ionViewDidLeave() {
    this.categoriesSubscription.unsubscribe();
  }

  async presentAlertPrompt(title: string, category: ICategory = null) {
    const alert = await this.alertController.create({
      header: title,
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {name: 'label', type: 'text', placeholder: 'New Category', value: category && category.label}
      ],
      buttons: [
        {
          text: 'Cancel', role: 'cancel', cssClass: 'secondary', handler: () => {
            return false;
          }
        },
        {
          text: category ? 'Update' : 'Add', handler: (data) => {
            if (data.label.trim().length < 3 || data.label.trim().length > 25) {
              setTimeout(async () => {
                const toast = await this.toastCtrl.create({
                  color: 'danger',
                  message: 'Category name required minimum 3 and maximum 25 characters.',
                  duration: 4000
                });
                await toast.present();
              });
              return false;
            }
            const isDuplicate = this.categories.find(
              d => {
                if (category) {
                  return (
                    d.label.toLowerCase().indexOf(data.label.trim().toLowerCase()) === 0 &&
                    category.id !== d.id
                  );
                } else {
                  return (
                    d.label.toLowerCase().indexOf(data.label.trim().toLowerCase()) === 0
                  );
                }
              }
            );
            if (isDuplicate) {
              setTimeout(async () => {
                const toast = await this.toastCtrl.create({
                  color: 'danger',
                  message: 'Duplicate Category, Category already exists.',
                  duration: 4000
                });
                await toast.present();
              });
              return false;
            } else {
              if (category) {
                this.categoriesService.updateData(category, data.label.trim());
              } else {
                this.categoriesService.addData(data.label.trim());
              }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    await this.modalCtrl.dismiss();
  }

  filterOnSearch($event: any) {
    this.searchTextAction.next($event.detail.value);
  }

  async deleteCategory(category: ICategory) {
    const alert = await this.alertController.create({
      header: 'Delete Confirmation!',
      mode: 'ios',
      message: `Are you sure! do you want to delete <br><b>${category.label}</b> Category?`,
      buttons: [
        {text: 'Cancel', role: 'cancel', cssClass: 'secondary'},
        {
          text: 'Okay',
          handler: () => {
            this.categoriesService.deleteData(category);
          }
        }
      ]
    });
    await alert.present();
  }
}
