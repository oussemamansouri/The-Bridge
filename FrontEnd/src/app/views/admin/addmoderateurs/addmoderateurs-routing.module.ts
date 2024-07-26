import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmoderateurComponent } from './addmoderateur/addmoderateur.component';

const routes: Routes = [
  {path:'',component:AddmoderateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmoderateursRoutingModule { }
