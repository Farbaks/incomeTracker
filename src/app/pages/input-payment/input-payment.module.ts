import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputPaymentPageRoutingModule } from './input-payment-routing.module';

import { InputPaymentPage } from './input-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputPaymentPageRoutingModule
  ],
  declarations: [InputPaymentPage]
})
export class InputPaymentPageModule {}
