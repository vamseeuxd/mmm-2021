import {ITransaction} from './i.transaction';

export interface ITransactionGroup {
  dueDate: string;
  transactions: ITransaction[];
}
