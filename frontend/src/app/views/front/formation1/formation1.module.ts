import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Formation1RoutingModule } from './formation1-routing.module';
import { Formation1Component } from './formation1/formation1.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Formation1Component
  ],
  imports: [
    CommonModule,
    Formation1RoutingModule,
    FormsModule,

  ]
})
export class Formation1Module { }
