import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { StatisticsPage } from './statistics';
import { StatisticsPageRoutingModule } from './statistics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StatisticsPageRoutingModule
  ],
  declarations: [
    StatisticsPage,
  ]
})
export class StatisticsModule { }
