import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultformationComponent } from './consultformation/consultformation.component';

const routes: Routes = [
  {path:'',component:ConsultformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultformationRoutingModule { }
