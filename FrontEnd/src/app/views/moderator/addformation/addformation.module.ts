import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddformationRoutingModule } from './addformation-routing.module';
import { AddformationComponent } from './addformation/addformation.component';


@NgModule({
  declarations: [
    AddformationComponent
  ],
  imports: [
    CommonModule,
    AddformationRoutingModule
  ]
})
export class AddformationModule { }
