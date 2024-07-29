import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpackRoutingModule } from './addpack-routing.module';
import { AddpackComponent } from './addpack/addpack.component';


@NgModule({
  declarations: [
    AddpackComponent
  ],
  imports: [
    CommonModule,
    AddpackRoutingModule
  ]
})
export class AddpackModule { }
