import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule, GAME_SERVICE_TOKEN, LIBRARY_SERVICE_TOKEN } from './games-routing.module';
import { GamesComponent } from './pages/games/games.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameCardComponent } from './components/game-card/game-card.component';
import { ClipboardModule } from 'ngx-clipboard';
import { GamesService } from './services/games.service';
import { LibraryService } from './services/library.service';


@NgModule({
  declarations: [
    GamesComponent,
    GameCardComponent
  ],
  providers: [
    {
      provide: GAME_SERVICE_TOKEN,
      useClass: GamesService,
    },
    {
      provide: LIBRARY_SERVICE_TOKEN,
      useClass: LibraryService,
    },
  ],
  imports: [
    CommonModule,
    SharedModule,
    GamesRoutingModule,
    ClipboardModule,
  ]
})
export class GamesModule { }
