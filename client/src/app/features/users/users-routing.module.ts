import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingUrl } from 'src/app/core/constants/routing/routing-url';
import { UsersComponent } from './pages/users/users.component';

export const USERS_SERVICE_TOKEN = new InjectionToken<string>('UsersService')
export const FRIENDS_SERVICE_TOKEN = new InjectionToken<string>('FriendshipService')

const routes: Routes = [
  { path: routingUrl.users.pages.users, component: UsersComponent, data: { requiredServiceToken: USERS_SERVICE_TOKEN } },
  { path: routingUrl.users.pages.friends, component: UsersComponent, data: { requiredServiceToken: FRIENDS_SERVICE_TOKEN } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
