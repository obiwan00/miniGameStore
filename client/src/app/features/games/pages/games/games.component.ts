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
  public isLoaderActive: boolean = true

  private gamesService: AbstractGameService

  // Req and res fields
  private queryParams: Partial<GameQueryParams>
  public gamesRes: GamesRes | null = (null)
  public games: Game[] = []

  // Pagination fields
  public offset = 0
  public gameItemsPerPage = 4
  public currentPage = 1

  // Search fields
  public searchValue: string = ''

  // Tag checkboxes fields
  public selectedTags: string[] = []
  public tagsInput: CheckboxData[]

  // Price range slider fields
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
    this.setQueryParams()
    this.gamesService.getGames(this.queryParams).subscribe({
      next: (res) => {
        this.gamesRes = res
        console.table({ gamesRes: this.gamesRes })
        this.updatePriceFields()
        this.updateTagsInput()
        this.isLoaderActive = false
      }
    })
  }

  setQueryParams() {
    this.queryParams = {
      offset: this.offset,
      limit: this.gameItemsPerPage,
      search: this.searchValue,
      tags: this.selectedTags,
      maxPrice: this.currentSearchPrice ?? -1,
    }
  }

  updateTagsInput() {
    if (typeof this.gamesRes?.availableTags === 'undefined') {
      this.tagsInput = []
    }

    const availableTags = this.gamesRes?.availableTags ?? []
    const searchTags = this.gamesRes?.tags ?? []
    this.tagsInput = availableTags?.map(availableTag => {
      return { value: searchTags?.includes(availableTag), name: availableTag }
    })
  }

  updatePriceFields() {
    this.maxPriceInput = this.gamesRes?.biggestPrice ?? 0
    this.currentSearchPrice = this.gamesRes?.maxPrice ?? -1
  }

  resetPaginationProps() {
    this.offset = 0
    this.currentPage = 1
  }

  pageChanged($event: number) {
    this.currentPage = $event
    this.offset = ($event - 1) * this.gameItemsPerPage

    this.searchGames()
  }

  onSearchChange($event: string) {
    this.searchValue = $event
    this.resetPaginationProps()
    this.searchGames()
  }

  onRangeSliderChange($event: number) {
    this.currentSearchPrice = $event
    this.resetPaginationProps()
    this.searchGames()
  }

  onCheckboxGroupChange($event: string[]) {
    this.selectedTags = $event
    this.resetPaginationProps()
    this.searchGames()
  }
}
