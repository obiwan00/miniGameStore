import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { GameQueryParams } from 'src/app/core/models/games/games-query-params.model';
import { AbstractGameService } from './games.abstract-service';

@Injectable()
export class LibraryService extends AbstractGameService {

  constructor(
    private apiService: ApiService,
  ) {
    super()
  }

  getGames(params: Partial<GameQueryParams> = {}) {
    return this.apiService.get('/library', new HttpParams({ fromObject: params }));
  }

  addGame(gameId: string) {
    return this.apiService.post(`/library/${gameId}`)
  }

  removeGame(gameId: string) {
    return this.apiService.delete(`/library/${gameId}`)
  }
}
