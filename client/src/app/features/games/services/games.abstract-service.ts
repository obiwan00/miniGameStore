import { Observable } from "rxjs";
import { GameQueryParams } from "../models/games-query-params.model";
import { GamesRes } from "../models/games-res.model";

export abstract class AbstractGameService {
  abstract getGames(params: Partial<GameQueryParams>) : Observable<GamesRes>
}
