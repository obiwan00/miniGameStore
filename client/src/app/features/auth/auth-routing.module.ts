import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingUrl } from 'src/app/core/constants/routing/routing-url';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  { path: routingUrl.auth.pages.login, component: LoginComponent },
  { path: routingUrl.auth.pages.register, component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
