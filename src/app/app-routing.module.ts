import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./pages/jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'job-detail',
    loadChildren: () => import('./pages/job-detail/job-detail.module').then( m => m.JobDetailPageModule)
  },
  {
    path: 'new-job',
    loadChildren: () => import('./pages/new-job/new-job.module').then( m => m.NewJobPageModule)
  },
  {
    path: 'input-quotation',
    loadChildren: () => import('./pages/input-quotation/input-quotation.module').then( m => m.InputQuotationPageModule)
  },
  {
    path: 'input-item',
    loadChildren: () => import('./pages/input-item/input-item.module').then( m => m.InputItemPageModule)
  },
  {
    path: 'input-payment',
    loadChildren: () => import('./pages/input-payment/input-payment.module').then( m => m.InputPaymentPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'edit-job',
    loadChildren: () => import('./pages/edit-job/edit-job.module').then( m => m.EditJobPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
