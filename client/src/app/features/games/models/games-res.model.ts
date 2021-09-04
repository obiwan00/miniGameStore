import { Game } from "src/app/core/models/game.model";

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
