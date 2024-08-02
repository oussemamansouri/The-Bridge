import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddpaiementRoutingModule } from './addpaiement-routing.module';
import { AddpaiementComponent } from './addpaiement/addpaiement.component';


@NgModule({
  declarations: [
    AddpaiementComponent
  ],
  imports: [
    CommonModule,
    AddpaiementRoutingModule
  ]
})
export class AddpaiementModule { }
