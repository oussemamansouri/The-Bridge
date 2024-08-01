import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifsRoutingModule } from './tarifs-routing.module';
import { TarifsComponent } from './tarifs/tarifs.component';


@NgModule({
  declarations: [
    TarifsComponent
  ],
  imports: [
    CommonModule,
    TarifsRoutingModule
  ]
})
export class TarifsModule { }
