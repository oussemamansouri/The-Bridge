import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultmoderateurComponent } from './consultmoderateur/consultmoderateur.component';

const routes: Routes = [
  {path:'',component:ConsultmoderateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultmoderateurRoutingModule { }
