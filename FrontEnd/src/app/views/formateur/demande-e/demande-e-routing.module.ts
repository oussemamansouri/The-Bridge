import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeEComponent } from './demande-e/demande-e.component';

const routes: Routes = [
  {path:'',component:DemandeEComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandeERoutingModule { }
