import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BusesListComponent} from './buses-list/buses-list.component';
import {BusesDetailComponent} from './buses-detail/buses-detail.component';

const routes: Routes = [
  {path: 'list', component: BusesListComponent},
  {path: 'detail/:id', component: BusesDetailComponent},
  {path: 'create', component: BusesDetailComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusesAdministrationRoutingModule { }
