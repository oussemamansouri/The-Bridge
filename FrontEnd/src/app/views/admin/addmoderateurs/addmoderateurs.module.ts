import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddmoderateursRoutingModule } from './addmoderateurs-routing.module';
import { AddmoderateurComponent } from './addmoderateur/addmoderateur.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddmoderateurComponent
  ],
  imports: [
    CommonModule,
    AddmoderateursRoutingModule,
    FormsModule
  ]
})
export class AddmoderateursModule { }
