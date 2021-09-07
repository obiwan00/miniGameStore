import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingUrl } from 'src/app/core/constants/routing/routing-url';
import { GamesComponent } from './pages/games/games.component';

export const GAME_SERVICE_TOKEN = new InjectionToken('GamesService')
export const LIBRARY_SERVICE_TOKEN = new InjectionToken('LibraryService')

const routes: Routes = [
  { path: routingUrl.games.pages.games, component: GamesComponent, data: {requiredServiceToken: GAME_SERVICE_TOKEN} },
  { path: routingUrl.games.pages.library, component: GamesComponent, data: {requiredServiceToken: LIBRARY_SERVICE_TOKEN} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
