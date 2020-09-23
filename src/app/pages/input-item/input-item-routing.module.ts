import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputItemPage } from './input-item.page';

const routes: Routes = [
  {
    path: '',
    component: InputItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputItemPageRoutingModule {}
