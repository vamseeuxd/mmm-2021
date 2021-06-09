import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html',
  styleUrls: ['./account-detail.scss'],
})
export class AccountDetailPage {
  account: any;

  constructor(
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get('speakerId');
      if (data && data.accounts) {
        for (const account of data.accounts) {
          if (account && account.id === speakerId) {
            this.account = account;
            break;
          }
        }
      }
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(account: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + account.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + account.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + account.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(account: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + account.name,
      buttons: [
        {
          text: `Email ( ${account.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + account.email);
          }
        },
        {
          text: `Call ( ${account.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + account.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
