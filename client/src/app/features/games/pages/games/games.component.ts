import { Component, InjectionToken, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Game } from 'src/app/core/models/game.model';
import { CheckboxData } from 'src/app/shared/components/checkbox-group/checkbox-data.model';
import { GameQueryParams } from '../../models/games-query-params.model';
import { GamesRes } from '../../models/games-res.model';
import { AbstractGameService } from '../../services/games.abstract-service';
import { GamesService } from '../../services/games.service';
import { LibraryService } from '../../services/library.service';


@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  // TODO: REFACTOR: based on route inject appropriate service
  private gamesService: AbstractGameService

  public isLoaderActive: boolean = true

  private subscriptions: Subscription[] = []
  private gamesResSubject: BehaviorSubject<GamesRes>
  public gamesRes$: Observable<GamesRes>

  public games: Game[] = []

  public searchValue: string = ''

  public selectedTags: string[] = []
  public tagsInput: CheckboxData[]

  public maxPriceInput: number = 0
  public currentSearchPrice: number = -1

  constructor(
    private route: ActivatedRoute,
    private injector: Injector,
  ) { }

  ngOnInit(): void {
    const InjectionToken = this.route.snapshot.data.requiredServiceToken
    this.gamesService = this.injector.get<AbstractGameService>(InjectionToken)

    this.gamesResSubject = new BehaviorSubject({} as GamesRes);
    this.gamesRes$ = this.gamesResSubject.asObservable();

    this.subscriptions.push(
      this.gamesRes$.subscribe(() => {
        this.updatePriceFields()
        this.updateTagsInput()
      })
    )

    this.searchGames();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
        this.gamesResSubject.next(res)
        this.isLoaderActive = false
      }
    })
  }

  updateTagsInput() {
    if (!this.gamesResSubject.value.availableTags) {
      this.tagsInput = []
    }

    const availableTags = this.gamesResSubject.value.availableTags
    const searchTags = this.gamesResSubject.value.tags
    this.tagsInput = availableTags?.map(availableTag => {
      return { value: searchTags.includes(availableTag), name: availableTag }
    })
  }

  updatePriceFields() {
    if (!this.gamesResSubject.value.maxPrice) {
      this.maxPriceInput = 0
      this.currentSearchPrice = -1
    }

    this.maxPriceInput = this.gamesResSubject.value.biggestPrice
    this.currentSearchPrice = this.gamesResSubject.value.maxPrice
  }

}
