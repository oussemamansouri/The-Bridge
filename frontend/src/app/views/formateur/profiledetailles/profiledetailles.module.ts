import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfiledetaillesRoutingModule } from './profiledetailles-routing.module';
import { ProfiledetaillesComponent } from './profiledetailles/profiledetailles.component';


@NgModule({
  declarations: [
    ProfiledetaillesComponent
  ],
  imports: [
    CommonModule,
    ProfiledetaillesRoutingModule
  ]
})
export class ProfiledetaillesModule { }
