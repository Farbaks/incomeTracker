import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InputPaymentPage } from './input-payment.page';

const routes: Routes = [
  {
    path: '',
    component: InputPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InputPaymentPageRoutingModule {}
