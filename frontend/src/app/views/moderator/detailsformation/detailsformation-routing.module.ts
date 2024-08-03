import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsformationComponent } from './detailsformation/detailsformation.component';

const routes: Routes = [
  {path:'',component:DetailsformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsformationRoutingModule { }
