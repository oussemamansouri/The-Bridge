import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeERoutingModule } from './demande-e-routing.module';
import { DemandeEComponent } from './demande-e/demande-e.component';


@NgModule({
  declarations: [
    DemandeEComponent
  ],
  imports: [
    CommonModule,
    DemandeERoutingModule
  ]
})
export class DemandeEModule { }
