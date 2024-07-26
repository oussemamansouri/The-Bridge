import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsformateurComponent } from './detailsformateur/detailsformateur.component';

const routes: Routes = [
  {path:'',component:DetailsformateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsformateurRoutingModule { }
