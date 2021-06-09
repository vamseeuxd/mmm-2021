export interface ITransaction {
  amount: string;
  amountPaid: string;
  paymentRemarks: string;
  dueDate: string;
  paidFrom: string;
  remarks: string;
  paidOn: string;
  type: string;
  for: string;
  category: string;
  taxSavingSection: string;
  repeat: string;
  noOfTimesRepeat: number;
  repeatStartDate: string;
  name: string;
  isPaid: 'yes' | 'no';
  isTaxSavings: 'yes' | 'no';
  id?: string;
  deleted?: boolean;
  createdOn?: string;
  updatedOn?: string;
  createdBy?: string;
  updatedBy?: string;
}
