import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFModule } from './dashboard-f.module';
import { DashboardfComponent } from './dashboardf/dashboardf.component';

const routes: Routes = [
   {path:'',component:DashboardfComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardFRoutingModule { }
