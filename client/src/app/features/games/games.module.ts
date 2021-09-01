import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './pages/games/games.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryComponent } from './pages/library/library.component';


@NgModule({
  declarations: [
    GamesComponent,
    LibraryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
