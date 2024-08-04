import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contact1Component } from './contact1/contact1.component';

const routes: Routes = [
  {path:'',component:Contact1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Contact1RoutingModule { }
