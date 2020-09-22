import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewJobPage } from './new-job.page';

const routes: Routes = [
  {
    path: '',
    component: NewJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewJobPageRoutingModule {}
