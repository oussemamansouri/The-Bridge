import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsmoderateurComponent } from './detailsmoderateur/detailsmoderateur.component';

const routes: Routes = [
  {path:'',component:DetailsmoderateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsmoderateurRoutingModule { }
