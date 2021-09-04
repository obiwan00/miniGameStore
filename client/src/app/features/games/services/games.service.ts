import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { GameQueryParams } from '../models/games-query-params.model';
import { GamesRes } from '../models/games-res.model';
import { AbstractGameService } from './games.abstract-service';



@Injectable({
  providedIn: 'root'
})
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
