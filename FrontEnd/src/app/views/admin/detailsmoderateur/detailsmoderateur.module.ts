import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsmoderateurRoutingModule } from './detailsmoderateur-routing.module';
import { DetailsmoderateurComponent } from './detailsmoderateur/detailsmoderateur.component';


@NgModule({
  declarations: [
    DetailsmoderateurComponent
  ],
  imports: [
    CommonModule,
    DetailsmoderateurRoutingModule
  ]
})
export class DetailsmoderateurModule { }
