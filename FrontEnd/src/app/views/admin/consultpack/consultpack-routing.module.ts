import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultpackComponent } from './consultpack/consultpack.component';

const routes: Routes = [
  {path:'',component:ConsultpackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultpackRoutingModule { }
