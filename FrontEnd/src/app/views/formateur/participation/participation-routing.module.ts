import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipationComponent } from './participation/participation.component';

const routes: Routes = [
  {path:'',component:ParticipationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipationRoutingModule { }
