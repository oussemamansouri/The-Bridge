import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaiementRoutingModule } from './paiement-routing.module';
import { PaiementComponent } from './paiement/paiement.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaiementComponent
  ],
  imports: [
    CommonModule,
    PaiementRoutingModule,
    FormsModule
  ]
})
export class PaiementModule { }
