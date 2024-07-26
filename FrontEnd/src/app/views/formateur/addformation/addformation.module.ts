import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddformationRoutingModule } from './addformation-routing.module';
import { AddformationComponent } from './addformation/addformation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddformationComponent
  ],
  imports: [
    CommonModule,
    AddformationRoutingModule,
    FormsModule
  ]
})
export class AddformationModule { }
