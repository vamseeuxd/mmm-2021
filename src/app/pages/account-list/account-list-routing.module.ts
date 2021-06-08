import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountListPage } from './account-list';
const routes: Routes = [
  {
    path: '',
    component: AccountListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountListPageRoutingModule {}
