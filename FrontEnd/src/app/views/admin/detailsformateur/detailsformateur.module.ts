import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsformateurRoutingModule } from './detailsformateur-routing.module';
import { DetailsformateurComponent } from './detailsformateur/detailsformateur.component';


@NgModule({
  declarations: [
    DetailsformateurComponent
  ],
  imports: [
    CommonModule,
    DetailsformateurRoutingModule
  ]
})
export class DetailsformateurModule { }
