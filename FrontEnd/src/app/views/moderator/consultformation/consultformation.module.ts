import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultformationRoutingModule } from './consultformation-routing.module';
import { ConsultformationComponent } from './consultformation/consultformation.component';


@NgModule({
  declarations: [
    ConsultformationComponent
  ],
  imports: [
    CommonModule,
    ConsultformationRoutingModule
  ]
})
export class ConsultformationModule { }
