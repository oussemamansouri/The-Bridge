import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginmoderateurComponent } from './loginmoderateur/loginmoderateur.component';

const routes: Routes = [
  {path:'',component:LoginmoderateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginmoderateurRoutingModule { }
