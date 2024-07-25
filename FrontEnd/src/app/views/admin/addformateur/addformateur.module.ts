import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddformateurRoutingModule } from './addformateur-routing.module';
import { AddformateurComponent } from './addformateur/addformateur.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddformateurComponent
  ],
  imports: [
    CommonModule,
    AddformateurRoutingModule,
    FormsModule
  ]
})
export class AddformateurModule { }
