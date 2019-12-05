import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainTemplateComponent} from './main-template/main-template.component';
import {LoginFormComponent} from "../login/login-form/login-form.component";
import {DashboardComponent} from "../dashboard/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: 'home',
    component: MainTemplateComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'persona',
        loadChildren: () => import('../person/person.module').then(mod => mod.PersonModule)
      },
      {
        path: 'trip',
        loadChildren: () => import('../trip-administration/trip-administration.module')
                                                              .then(mod => mod.TripAdministrationModule)
      },
      {
        path: 'bus',
        loadChildren: () => import('../buses-administration/buses-administration.module')
                                                              .then(mod => mod.BusesAdministrationModule)
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
