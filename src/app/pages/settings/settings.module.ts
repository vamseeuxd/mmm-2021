import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings';
import { PopoverPage } from '../about-popover/about-popover';
import { SettingsPageRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [SettingsPage],
})
export class SettingsModule {}
