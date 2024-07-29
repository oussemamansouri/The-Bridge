import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeRoutingModule } from './demande-routing.module';
import { DemandeComponent } from './demande/demande.component';


@NgModule({
  declarations: [
    DemandeComponent
  ],
  imports: [
    CommonModule,
    DemandeRoutingModule
  ]
})
export class DemandeModule { }
