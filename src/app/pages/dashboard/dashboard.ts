import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, Config, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController} from '@ionic/angular';

import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {MmmFireService} from '../../services/mmm-fire/mmm-fire.service';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', {static: true}) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownTransactions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  selectedDate = '05/06/2021';
  transactions = [];

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public mmmFireService: MmmFireService,
    public config: Config
  ) {
  }

  ngOnInit() {
    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
    this.updateFilteredTransactions();
  }

  updateSchedule() {
    // Close any open sliding items when the dashboard updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownTransactions = data.shownTransactions;
      this.groups = data.groups;
    });
  }

  updateFilteredTransactions() {
    this.transactions = this.mmmFireService.transactionsGroupedByDueDate.filter(d => {
      const dueDate = new Date(d.dueDate);
      const selectedDate = new Date(this.selectedDate.split('T')[0]);
      dueDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      return dueDate.getMonth() === selectedDate.getMonth() && dueDate.getFullYear() === selectedDate.getFullYear();
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {excludedTracks: this.excludeTracks}
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, transactionData: any) {
    if (this.user.hasFavorite(transactionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, transactionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.user.addFavorite(transactionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${transactionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, transactionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this transaction from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the transaction
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this transaction from their favorites
            this.user.removeFavorite(transactionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }

  nextMonth() {
    const now = new Date(this.selectedDate);
    let current;
    if (now.getMonth() === 11) {
      current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    this.selectedDate = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  }

  previousMonth() {
    const now = new Date(this.selectedDate);
    let current;
    if (now.getMonth() === 0) {
      current = new Date(now.getFullYear() - 1, 11, 31);
    } else {
      current = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    }
    this.selectedDate = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
  }
}
