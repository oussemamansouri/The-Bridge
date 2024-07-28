import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultformateurRoutingModule } from './consultformateur-routing.module';
import { ConsultformateurComponent } from './consultformateur/consultformateur.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultformateurComponent
  ],
  imports: [
    CommonModule,
    ConsultformateurRoutingModule,
    FormsModule
  ]
})
export class ConsultformateurModule { }
