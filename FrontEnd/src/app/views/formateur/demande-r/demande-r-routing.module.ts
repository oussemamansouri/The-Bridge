import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeRComponent } from './demande-r/demande-r.component';

const routes: Routes = [
  {path:'',component:DemandeRComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeRRoutingModule { }
