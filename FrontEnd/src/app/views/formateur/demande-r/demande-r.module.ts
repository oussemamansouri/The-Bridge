import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRRoutingModule } from './demande-r-routing.module';
import { DemandeRComponent } from './demande-r/demande-r.component';


@NgModule({
  declarations: [
    DemandeRComponent
  ],
  imports: [
    CommonModule,
    DemandeRRoutingModule
  ]
})
export class DemandeRModule { }
