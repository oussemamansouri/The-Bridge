import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpackRoutingModule } from './addpack-routing.module';
import { AddpackComponent } from './addpack/addpack.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddpackComponent
  ],
  imports: [
    CommonModule,
    AddpackRoutingModule,
    FormsModule
  ]
})
export class AddpackModule { }
