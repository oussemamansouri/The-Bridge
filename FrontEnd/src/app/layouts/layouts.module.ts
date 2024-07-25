import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ModeratorLayoutComponent } from './moderator-layout/moderator-layout.component';
import { FormateurLayoutComponent } from './formateur-layout/formateur-layout.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { RouterModule } from '@angular/router';
import { FormationLayoutComponent } from './formation-layout/formation-layout.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    ModeratorLayoutComponent,
    FormateurLayoutComponent,
    FrontLayoutComponent,
    FormationLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
