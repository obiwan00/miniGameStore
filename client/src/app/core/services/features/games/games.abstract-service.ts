import { Observable } from "rxjs";
import { GameQueryParams } from "src/app/core/models/games/games-query-params.model";
import { GamesRes } from "src/app/core/models/games/games-res.model";

export abstract class AbstractGameService {
  abstract getGames(params: Partial<GameQueryParams>) : Observable<GamesRes>
}
