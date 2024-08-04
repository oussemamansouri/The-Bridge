import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsformationRoutingModule } from './detailsformation-routing.module';
import { DetailsformationComponent } from './detailsformation/detailsformation.component';


@NgModule({
  declarations: [
    DetailsformationComponent
  ],
  imports: [
    CommonModule,
    DetailsformationRoutingModule
  ]
})
export class DetailsformationModule { }
