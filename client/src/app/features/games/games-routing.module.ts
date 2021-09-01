import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { LibraryComponent } from './pages/library/library.component';

const routes: Routes = [
  { path: '', component: GamesComponent },
  { path: 'library', component: LibraryComponent },
];
// TODO: Add profile page -- other lazy load module
// TODO: Add users page -- other lazy load module

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
