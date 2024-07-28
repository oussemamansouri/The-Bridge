import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginformateurRoutingModule } from './loginformateur-routing.module';
import { LoginformateurComponent } from './loginformateur/loginformateur.component';


@NgModule({
  declarations: [
    LoginformateurComponent
  ],
  imports: [
    CommonModule,
    LoginformateurRoutingModule
  ]
})
export class LoginformateurModule { }
