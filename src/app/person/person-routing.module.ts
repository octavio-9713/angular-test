import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {DetalleComponent} from './detalle/detalle.component';

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'detail/:id', component: DetalleComponent},
  {path: 'create', component: DetalleComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
