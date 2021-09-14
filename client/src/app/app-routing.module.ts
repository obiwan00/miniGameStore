import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingUrl } from './core/constants/routing/routing-url';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: routingUrl.games.baseUrl, pathMatch: 'full' },
  {
    path: routingUrl.auth.baseUrl,
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: routingUrl.games.baseUrl,
    loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule)
  },
  {
    path: routingUrl.users.baseUrl,
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  },
  {
    path: routingUrl.profile.baseUrl,
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
  },
  { path: routingUrl['500'].baseUrl, component: ErrorPageComponent, data: routingUrl['500'].data },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
