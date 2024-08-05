import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultpackRoutingModule } from './consultpack-routing.module';
import { ConsultpackComponent } from './consultpack/consultpack.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultpackComponent
  ],
  imports: [
    CommonModule,
    ConsultpackRoutingModule,
    FormsModule
  ]
})
export class ConsultpackModule { }
