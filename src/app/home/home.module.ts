import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainTemplateComponent } from './main-template/main-template.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {DashboardModule} from '../dashboard/dashboard.module';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [MainTemplateComponent],
  exports: [
    MainTemplateComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class HomeModule { }
