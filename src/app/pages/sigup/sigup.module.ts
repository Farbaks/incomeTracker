import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigupPageRoutingModule } from './sigup-routing.module';

import { SigupPage } from './sigup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigupPageRoutingModule
  ],
  declarations: [SigupPage]
})
export class SigupPageModule {}
