import { Game } from "src/app/core/models/games/game.model";

export interface GamesRes {
  limit: number
  offset: number
  maxPrice: number
  biggestPrice: number,
  tags: string[]
  search: string
  games: Game[]
  availableTags: string[]
}
