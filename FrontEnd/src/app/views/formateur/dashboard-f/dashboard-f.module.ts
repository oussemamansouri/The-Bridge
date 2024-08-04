import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFRoutingModule } from './dashboard-f-routing.module';
import { DashboardfComponent } from './dashboardf/dashboardf.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardfComponent
  ],
  imports: [
    CommonModule,
    DashboardFRoutingModule,
    FormsModule,
  ]
})
export class DashboardFModule { }
