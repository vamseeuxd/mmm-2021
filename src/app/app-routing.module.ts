import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckTutorial} from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  /*
  {
    path: 'manage-categories',
    loadChildren: () => import('./manage-categories/manage-categories.module').then(m => m.ManageCategoriesPageModule)
  },
  {
    path: 'manage-tax-saving-sections',
    loadChildren: () => import('./manage-tax-saving-sections/manage-tax-saving-sections.module').then(m => m.ManageTaxSavingSectionsPageModule)
  },
  {
    path: 'manage-expenses-for',
    loadChildren: () => import('./manage-expenses-for/manage-expenses-for.module').then(m => m.ManageTaxExpensesForPageModule)
  }
  */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
