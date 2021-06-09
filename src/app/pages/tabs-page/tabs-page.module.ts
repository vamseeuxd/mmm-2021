import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { SettingsModule } from '../settings/settings.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { TransactionDetailModule } from '../transaction-detail/transaction-detail.module';
import { AccountDetailModule } from '../account-detail/account-detail.module';
import { AccountListModule } from '../account-list/account-list.module';

@NgModule({
  imports: [
    SettingsModule,
    CommonModule,
    IonicModule,
    StatisticsModule,
    DashboardModule,
    TransactionDetailModule,
    AccountDetailModule,
    AccountListModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
