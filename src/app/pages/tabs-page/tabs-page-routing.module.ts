import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { DashboardPage } from '../dashboard/dashboard';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            component: DashboardPage,
          },
          {
            path: 'transaction/:transactionId',
            loadChildren: () => import('../transaction-detail/transaction-detail.module').then(m => m.TransactionDetailModule)
          }
        ]
      },
      {
        path: 'accounts',
        children: [
          {
            path: '',
            loadChildren: () => import('../account-list/account-list.module').then(m => m.AccountListModule)
          },
          {
            path: 'transaction/:transactionId',
            loadChildren: () => import('../transaction-detail/transaction-detail.module').then(m => m.TransactionDetailModule)
          },
          {
            path: 'account-details/:speakerId',
            loadChildren: () => import('../account-detail/account-detail.module').then(m => m.AccountDetailModule)
          }
        ]
      },
      {
        path: 'statistics',
        children: [
          {
            path: '',
            loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

