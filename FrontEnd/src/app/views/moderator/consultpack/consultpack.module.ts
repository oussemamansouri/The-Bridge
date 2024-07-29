import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultpackRoutingModule } from './consultpack-routing.module';
import { ConsultpackComponent } from './consultpack/consultpack.component';


@NgModule({
  declarations: [
    ConsultpackComponent
  ],
  imports: [
    CommonModule,
    ConsultpackRoutingModule
  ]
})
export class ConsultpackModule { }
