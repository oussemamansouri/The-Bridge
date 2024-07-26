import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginmoderateurRoutingModule } from './loginmoderateur-routing.module';
import { LoginmoderateurComponent } from './loginmoderateur/loginmoderateur.component';


@NgModule({
  declarations: [
    LoginmoderateurComponent
  ],
  imports: [
    CommonModule,
    LoginmoderateurRoutingModule
  ]
})
export class LoginmoderateurModule { }
