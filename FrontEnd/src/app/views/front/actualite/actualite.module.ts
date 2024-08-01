import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualiteRoutingModule } from './actualite-routing.module';
import { ActualiteComponent } from './actualite/actualite.component';


@NgModule({
  declarations: [
    ActualiteComponent
  ],
  imports: [
    CommonModule,
    ActualiteRoutingModule
  ]
})
export class ActualiteModule { }
