import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginuserRoutingModule } from './loginuser-routing.module';
import { LoginuserComponent } from './loginuser/loginuser.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginuserComponent
  ],
  imports: [
    CommonModule,
    LoginuserRoutingModule,
    FormsModule,
  ]
})
export class LoginuserModule { }
