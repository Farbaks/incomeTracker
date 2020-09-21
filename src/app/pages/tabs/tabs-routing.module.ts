import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
          }
        ]
      },
      {
        path: 'jobs',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/jobs/jobs.module').then(m => m.JobsPageModule),
          },
          {
            path: ':id',
            loadChildren: () => import('src/app/pages/job-detail/job-detail.module').then(m => m.JobDetailPageModule),
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/account/account.module').then(m => m.AccountPageModule),
          }
        ]
      },
      { 
        path: '', 
        redirectTo: 'dashboard'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
