import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfiledetaillesComponent } from './profiledetailles/profiledetailles.component';

const routes: Routes = [
  {path:'',component:ProfiledetaillesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfiledetaillesRoutingModule { }
