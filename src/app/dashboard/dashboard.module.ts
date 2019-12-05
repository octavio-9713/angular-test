import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from "@angular/material/card";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    RouterModule,
    MatIconModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
