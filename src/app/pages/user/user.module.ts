import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './user';
import { UserPageRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserPageRoutingModule
  ],
  declarations: [
    AccountPage,
  ]
})
export class UserModule { }
