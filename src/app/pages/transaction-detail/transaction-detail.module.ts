import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDetailPage } from './transaction-detail';
import { TransactionDetailPageRoutingModule } from './transaction-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TransactionDetailPageRoutingModule
  ],
  declarations: [
    TransactionDetailPage,
  ]
})
export class TransactionDetailModule { }
