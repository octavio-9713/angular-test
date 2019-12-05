import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFormComponent} from '../login/login-form/login-form.component';
import {AuthGuard} from '../security/guard/auth.guard';

const routes: Routes = [
      {path: '', redirectTo: '/home/persona/list', pathMatch: 'full'},
      {path: 'login',  component: LoginFormComponent},
      {
        path: 'home', canActivate: [AuthGuard],
        loadChildren: () => import ('../home/home.module').then(mod => mod.HomeModule)
      }
  ];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
