import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddformateurComponent } from './addformateur/addformateur.component';

const routes: Routes = [
  {path:'',component:AddformateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddformateurRoutingModule { }
