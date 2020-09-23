import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputItemPageRoutingModule } from './input-item-routing.module';

import { InputItemPage } from './input-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputItemPageRoutingModule
  ],
  declarations: [InputItemPage]
})
export class InputItemPageModule {}
