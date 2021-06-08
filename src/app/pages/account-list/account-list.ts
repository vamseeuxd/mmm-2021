import { Component } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';

@Component({
  selector: 'page-account-list',
  templateUrl: 'account-list.html',
  styleUrls: ['./account-list.scss'],
})
export class AccountListPage {
  accounts: any[] = [];

  constructor(public confData: ConferenceData) {}

  ionViewDidEnter() {
    this.confData.getSpeakers().subscribe((accounts: any[]) => {
      this.accounts = accounts;
    });
  }
}
