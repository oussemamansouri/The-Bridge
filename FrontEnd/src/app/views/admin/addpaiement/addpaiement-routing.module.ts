import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpaiementComponent } from './addpaiement/addpaiement.component';

const routes: Routes = [
  {path:'',component:AddpaiementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddpaiementRoutingModule { }
