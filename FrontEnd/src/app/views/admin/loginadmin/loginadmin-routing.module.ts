import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginadminComponent } from './loginadmin/loginadmin.component';

const routes: Routes = [
  {path:'',component:LoginadminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginadminRoutingModule { }
