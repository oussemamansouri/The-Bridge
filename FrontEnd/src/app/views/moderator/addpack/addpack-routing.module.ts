import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpackComponent } from './addpack/addpack.component';

const routes: Routes = [
  {path:'',component:AddpackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpackRoutingModule { }
