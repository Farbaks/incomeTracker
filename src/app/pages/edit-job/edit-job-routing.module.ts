import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditJobPage } from './edit-job.page';

const routes: Routes = [
  {
    path: '',
    component: EditJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditJobPageRoutingModule {}
