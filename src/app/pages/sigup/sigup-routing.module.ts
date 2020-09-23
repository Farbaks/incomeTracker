import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigupPage } from './sigup.page';

const routes: Routes = [
  {
    path: '',
    component: SigupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigupPageRoutingModule {}
