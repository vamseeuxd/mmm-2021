import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingController, ToastController} from '@ionic/angular';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {combineLatest, Observable, of} from 'rxjs';
import {shareReplay, switchMap} from 'rxjs/operators';

export interface ICategory {
  label: string;
  id?: string;
  default?: boolean;
  deleted?: boolean;
  createdOn?: string;
  updatedOn?: string;
  createdBy?: string;
  updatedBy?: string;
}


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  // @ts-ignore
  private action: AngularFirestoreCollection<ICategory>;
  // @ts-ignore
  public categories$: Observable<ICategory[]>;
  private userInfo: firebase.UserInfo | null;

  constructor(
    public auth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    firestore: AngularFirestore,) {
    this.auth.user.subscribe((user) => {
      if (
        user &&
        user.providerData &&
        user.providerData.length > 0 &&
        user.providerData[0]
      ) {
        this.userInfo = user.providerData[0];
      } else {
        this.userInfo = null;
      }
    });
    this.action = firestore.collection<ICategory>('categories', ref => {
      return ref.where('deleted', '==', false).orderBy('createdOn');
    });
    // this.categories$ = this.action.valueChanges();
    this.categories$ = combineLatest(
      firestore.collection<ICategory>('default-categories').valueChanges(),
      this.action.valueChanges()
    ).pipe(
      switchMap(value => {
        return of(
          [
            ...value[0].map(d => ({...d, default: true})),
            // @ts-ignore
            ...value[1].map(d => ({...d, default: false}))
          ]
        );
      }),
      shareReplay()
    );
  }

  async addData(categoryName: string) {
    if (categoryName.trim().length > 0) {
      const loading = await this.loadingCtrl.create({message: `Please wait...`, duration: null});
      await loading.present();
      const docRef = this.action.ref.doc();
      const label = categoryName.trim();
      const id = docRef.id;
      const deleted = false;
      const createdOn = this.getServerTime();
      const updatedOn = this.getServerTime();
      const createdBy = this.userInfo?.email;
      const updatedBy = this.userInfo?.email;
      try {
        await docRef.set({
          label,
          id,
          createdOn,
          updatedOn,
          createdBy,
          updatedBy,
          deleted,
        });
        categoryName = '';
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          color: 'success',
          message: 'new Category added successfully.',
          duration: 4000
        });
        await toast.present();
      } catch (e) {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: e.message,
          color: 'danger',
          duration: 4000
        });
        await toast.present();
      }
    }
  }

  async deleteData(data: ICategory) {
    const loading = await this.loadingCtrl.create({message: `Please wait...`});
    await loading.present();
    try {
      const docRef = this.action.doc(data.id);
      const doc = await docRef.get().toPromise();
      const updatedOn = this.getServerTime();
      const updatedBy = this.userInfo?.email;
      await docRef.set({
        ...data,
        deleted: true,
        updatedOn,
        updatedBy,
      });
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: 'category have been deleted.',
        color:'success',
        duration: 4000
      });
      await toast.present();
    } catch (e) {
      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: e.message,
        color: 'danger',
        duration: 4000
      });
      await toast.present();
    }

  }

  async updateData(data: ICategory, categoryName: string) {
    if (categoryName.trim().length > 0) {
      const loading = await this.loadingCtrl.create({message: `Please wait...`});
      await loading.present();
      const docRef = this.action.doc(data.id).ref;
      const label = categoryName.trim();
      const updatedOn = this.getServerTime();
      const updatedBy = this.userInfo?.email;
      try {
        await docRef.update({
          label,
          updatedOn,
          updatedBy,
        });
        categoryName = '';
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'category have been updated.',
          duration: 4000
        });
        await toast.present();
      } catch (e) {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: e.message,
          color: 'danger',
          duration: 4000
        });
        await toast.present();
      }
    }
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000;
  }

}
