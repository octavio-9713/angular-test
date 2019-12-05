import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TripListComponent} from './trip-list/trip-list.component';
import {TripDetailComponent} from './trip-detail/trip-detail.component';


const routes: Routes = [
  {path: 'list', component: TripListComponent},
  {path: 'detail/:id', component: TripDetailComponent},
  {path: 'create', component: TripDetailComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripAdministrationRoutingModule { }
