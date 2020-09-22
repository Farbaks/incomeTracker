import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewJobPageRoutingModule } from './new-job-routing.module';

import { NewJobPage } from './new-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewJobPageRoutingModule
  ],
  declarations: [NewJobPage]
})
export class NewJobPageModule {}
