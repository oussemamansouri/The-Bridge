import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddformationComponent } from './addformation/addformation.component';

const routes: Routes = [
  {path:'',component:AddformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddformationRoutingModule { }
