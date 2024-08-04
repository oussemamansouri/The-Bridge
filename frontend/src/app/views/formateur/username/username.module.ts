import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsernameRoutingModule } from './username-routing.module';
import { UsernameComponent } from './username/username.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // UsernameComponent
  ],
  imports: [
    CommonModule,
    UsernameRoutingModule,
    FormsModule
  ]
})
export class UsernameModule { }
