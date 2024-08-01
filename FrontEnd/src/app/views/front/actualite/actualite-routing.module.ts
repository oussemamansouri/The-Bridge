import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteComponent } from './actualite/actualite.component';

const routes: Routes = [
  {path:'',component:ActualiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualiteRoutingModule { }
