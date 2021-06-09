import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionDetailPage } from './transaction-detail';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionDetailPageRoutingModule { }
