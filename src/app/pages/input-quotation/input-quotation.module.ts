import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputQuotationPageRoutingModule } from './input-quotation-routing.module';

import { InputQuotationPage } from './input-quotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputQuotationPageRoutingModule
  ],
  declarations: [InputQuotationPage]
})
export class InputQuotationPageModule {}
