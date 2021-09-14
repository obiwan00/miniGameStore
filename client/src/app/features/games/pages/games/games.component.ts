import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/core/models/games/game.model';
import { CheckboxData } from 'src/app/shared/components/checkbox-group/checkbox-data.model';
import { GameQueryParams } from 'src/app/core/models/games/games-query-params.model';
import { GamesRes } from 'src/app/core/models/games/games-res.model';
import { AbstractGameService } from 'src/app/core/services/features/games/games.abstract-service';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  // TODO: REFACTOR: based on route inject appropriate service
  private gamesService: AbstractGameService

  public isLoaderActive: boolean = true

  public gamesRes: GamesRes = ({} as GamesRes)

  public games: Game[] = []

  public searchValue: string = ''

  public selectedTags: string[] = []
  public tagsInput: CheckboxData[]

  public maxPriceInput: number
  public currentSearchPrice: number

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const InjectionToken = this.route.snapshot.data.requiredServiceToken
    this.gamesService = this.injector.get<AbstractGameService>(InjectionToken)

    this.searchGames();
  }

  searchGames() {
    this.isLoaderActive = true;
    const params: Partial<GameQueryParams> = {
      search: this.searchValue,
      tags: this.selectedTags,
      maxPrice: this.currentSearchPrice ?? -1,
    }
    this.gamesService.getGames(params).subscribe({
      next: (res) => {
        this.gamesRes = res
        this.updatePriceFields()
        this.updateTagsInput()
        this.isLoaderActive = false
      }
    })
  }

  updateTagsInput() {
    if (typeof this.gamesRes.availableTags === 'undefined') {
      this.tagsInput = []
    }

    const availableTags = this.gamesRes.availableTags
    const searchTags = this.gamesRes.tags
    this.tagsInput = availableTags?.map(availableTag => {
      return { value: searchTags.includes(availableTag), name: availableTag }
    })
  }

  updatePriceFields() {
    this.maxPriceInput = this.gamesRes.biggestPrice ?? 0
    this.currentSearchPrice = this.gamesRes.maxPrice ?? -1
  }

}
