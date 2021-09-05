import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', loadChildren: () => import('./features/games/games.module').then(m => m.GamesModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: '500', component: ErrorPageComponent , data: {title: '500', description: 'Internal server error'}},
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];
// TODO: ADD: Add profile page -- other lazy load module

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
