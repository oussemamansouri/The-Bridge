import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultformateurComponent } from './consultformateur/consultformateur.component';

const routes: Routes = [
  {path:'',component:ConsultformateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultformateurRoutingModule { }
