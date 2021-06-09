import {Injectable} from '@angular/core';
import 'firebase/firestore';
import * as moment from 'moment';
import {ITransaction} from '../../interfaces/i.transaction';
import {ITransactionGroup} from '../../interfaces/i-transaction.group';

@Injectable({
  providedIn: 'root'
})
export class MmmFireService {

  transactionsGroupedByDueDate: ITransactionGroup[] = [];
  transactions: ITransaction[] = [];

  constructor() {
    this.getFakeTransactions();
  }

  getFakeTransactions(): void {
    fetch('./assets/data/transaction_list.json')
      .then(response => response.json())
      .then(data => {
        const rv = this.groupDataBy(data, 'dueDate');
        this.transactions = data;
        this.transactionsGroupedByDueDate = Object.keys(rv).map(d => ({dueDate: d, transactions: rv[d]}));
      });
  }

  groupDataBy(data, key) {
    return data.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  getRepeatListForTransaction(transaction: ITransaction) {
    const result = Array.from(Array(transaction.noOfTimesRepeat).keys()).map(value => {
      const startDate = moment(transaction.repeatStartDate, 'MM/DD/YYYY');
      startDate.add(value, 'M');
      return {...transaction, dueDate: startDate.format('MM/DD/YYYY')};
    });
    return result;
  }
}
