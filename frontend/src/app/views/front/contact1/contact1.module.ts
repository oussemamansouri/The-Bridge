import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Contact1RoutingModule } from './contact1-routing.module';
import { Contact1Component } from './contact1/contact1.component';



@NgModule({
  declarations: [
    Contact1Component
  ],
  imports: [
    CommonModule,
    Contact1RoutingModule,

  ]
})
export class Contact1Module { }
