import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Formation1Component } from './formation1/formation1.component';

const routes: Routes = [
  {path:'',component:Formation1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Formation1RoutingModule { }
