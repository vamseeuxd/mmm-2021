import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import {ComponentsModule} from '../../components/components.module';
import {ManageTaxSavingSectionsPage} from '../manage-tax-saving-sections/manage-tax-saving-sections.page';
import {ManageExpensesForPage} from '../manage-expenses-for/manage-expenses-for.page';
import {ManageCategoriesPage} from '../manage-categories/manage-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DashboardPageRoutingModule
  ],
  declarations: [
    DashboardPage,
    ScheduleFilterPage,
    ManageTaxSavingSectionsPage,
    ManageExpensesForPage,
    ManageCategoriesPage,
  ],
  entryComponents: [
    ScheduleFilterPage,
    ManageTaxSavingSectionsPage,
    ManageExpensesForPage,
    ManageCategoriesPage,
  ]
})
export class DashboardModule { }
