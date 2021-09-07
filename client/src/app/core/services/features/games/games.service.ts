import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { GameQueryParams } from 'src/app/core/models/games/games-query-params.model';
import { GamesRes } from 'src/app/core/models/games/games-res.model';
import { AbstractGameService } from './games.abstract-service';



@Injectable()
export class GamesService extends AbstractGameService {

  constructor(
    private apiService: ApiService,
  ) {
    super()
  }

  getGames(params: Partial<GameQueryParams> = {}): Observable<GamesRes> {
    return this.apiService.get('/games', new HttpParams({ fromObject: params }));
  }

}
