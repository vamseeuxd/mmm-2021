import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountListPage } from './account-list';
import { AccountListPageRoutingModule } from './account-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountListPageRoutingModule
  ],
  declarations: [AccountListPage],
})
export class AccountListModule {}
