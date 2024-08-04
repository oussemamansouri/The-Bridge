import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page404RoutingModule } from './page404-routing.module';
import { Page404Component } from './page404/page404.component';


@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    CommonModule,
    Page404RoutingModule
  ]
})
export class Page404Module { }
