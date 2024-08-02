import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginadminRoutingModule } from './loginadmin-routing.module';
import { LoginadminComponent } from './loginadmin/loginadmin.component';


@NgModule({
  declarations: [
    LoginadminComponent
  ],
  imports: [
    CommonModule,
    LoginadminRoutingModule
  ]
})
export class LoginadminModule { }
