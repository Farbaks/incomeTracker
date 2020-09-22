import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputQuotationPage } from './input-quotation.page';

const routes: Routes = [
  {
    path: '',
    component: InputQuotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputQuotationPageRoutingModule {}
