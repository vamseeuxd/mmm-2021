import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-transaction-detail',
  styleUrls: ['./transaction-detail.scss'],
  templateUrl: 'transaction-detail.html'
})
export class TransactionDetailPage {
  transaction: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const transactionId = this.route.snapshot.paramMap.get('transactionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.transactions) {
            for (const transaction of group.transactions) {
              if (transaction && transaction.id === transactionId) {
                this.transaction = transaction;

                this.isFavorite = this.userProvider.hasFavorite(
                  this.transaction.name
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/dashboard`;
  }

  transactionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.transaction.name)) {
      this.userProvider.removeFavorite(this.transaction.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.transaction.name);
      this.isFavorite = true;
    }
  }

  shareTransaction() {
    console.log('Clicked share transaction');
  }
}
