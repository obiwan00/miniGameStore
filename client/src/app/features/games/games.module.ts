import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule, GAME_SERVICE_TOKEN, LIBRARY_SERVICE_TOKEN } from './games-routing.module';
import { GamesComponent } from './pages/games/games.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { ClipboardModule } from 'ngx-clipboard';
import { GamesService } from 'src/app/core/services/features/games/games.service';
import { LibraryService } from 'src/app/core/services/features/games/library.service';
import { CheckboxGroupModule } from 'src/app/shared/components/checkbox-group/checkbox-group.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { RangeSliderModule } from 'src/app/shared/components/range-slider/range-slider.module';
import { SearchBarModule } from 'src/app/shared/components/search-bar/search-bar.module';


@NgModule({
  declarations: [
    GamesComponent,
    GameCardComponent
  ],
  providers: [
    GamesService,
    LibraryService,
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
    CheckboxGroupModule,
    GamesRoutingModule,
    ClipboardModule,
    LoaderModule,
    RangeSliderModule,
    SearchBarModule,
  ]
})
export class GamesModule { }
