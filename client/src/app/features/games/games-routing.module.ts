import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';

export const GAME_SERVICE_TOKEN = new InjectionToken('GamesService')
export const LIBRARY_SERVICE_TOKEN = new InjectionToken('LibraryService')

const routes: Routes = [
  { path: '', component: GamesComponent, data: {requiredServiceToken: GAME_SERVICE_TOKEN} },
  { path: 'library', component: GamesComponent, data: {requiredServiceToken: LIBRARY_SERVICE_TOKEN} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
