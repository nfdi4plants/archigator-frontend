import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {MainComponent} from "./main/main.component";
import {OrderComponent} from "./order/order.component";
import {AuthGuard} from "./services/auth.guard.service";
import {AuthTestComponent} from "./auth-test/auth-test.component";
import {LoginComponent} from "./login/login.component";
import {IntroComponent} from "./intro/intro.component";


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard] // Apply the AuthGuard here
  },
  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },
  { path: 'welcome', component: IntroComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', redirectTo: '/main', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
