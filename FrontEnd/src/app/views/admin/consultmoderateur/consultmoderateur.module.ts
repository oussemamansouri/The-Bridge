import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultmoderateurRoutingModule } from './consultmoderateur-routing.module';
import { ConsultmoderateurComponent } from './consultmoderateur/consultmoderateur.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultmoderateurComponent
  ],
  imports: [
    CommonModule,
    ConsultmoderateurRoutingModule,
    FormsModule
  ]
})
export class ConsultmoderateurModule { }
