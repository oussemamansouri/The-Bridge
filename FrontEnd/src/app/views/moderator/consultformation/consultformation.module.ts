import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultformationRoutingModule } from './consultformation-routing.module';
import { ConsultformationComponent } from './consultformation/consultformation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultformationComponent
  ],
  imports: [
    CommonModule,
    ConsultformationRoutingModule,
    FormsModule
  ]
})
export class ConsultformationModule { }
