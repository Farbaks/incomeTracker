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
                children: [
                  {
                    path: '',
                    loadChildren: () => import('src/app/pages/job-detail/job-detail.module').then(m => m.JobDetailPageModule),
                  },
                  {
                    path: 'quote',
                    loadChildren: () => import('src/app/pages/input-quotation/input-quotation.module').then(m => m.InputQuotationPageModule),

                  }
                ]
              }
            ]
          },
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
            children: [
              {
                path: '',
                loadChildren: () => import('src/app/pages/job-detail/job-detail.module').then(m => m.JobDetailPageModule),
              },
              {
                path: 'quote',
                loadChildren: () => import('src/app/pages/input-quotation/input-quotation.module').then(m => m.InputQuotationPageModule),

              }
            ]
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('src/app/pages/account/account.module').then(m => m.AccountPageModule),
            children: [
              {
                path: '',
                loadChildren: () => import('src/app/pages/account/account.module').then(m => m.AccountPageModule),
              },
              {
                path: 'profile',
                loadChildren: () => import('src/app/pages/profile/profile.module').then(m => m.ProfilePageModule),
              },
              {
                path: 'privacy',
                loadChildren: () => import('src/app/pages/privacy/privacy.module').then(m => m.PrivacyPageModule),
              },
            ]
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
export class TabsPageRoutingModule { }
