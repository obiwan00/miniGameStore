import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/core/models/game.model';
import { LibraryService } from '../../services/library.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game: Game;
  @Output() cardEmitter = new EventEmitter<undefined>()

  constructor(
    private libService: LibraryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  addGameToLib(gameId: string) {
    this.libService.addGame(gameId).subscribe({
      next: () => {
        this.cardEmitter.emit()
        this.toastr.success('The game was added to your library')
      },
      error: (err) => {
        this.toastr.error(err.message)
      }
    })
  }
  removeGameFromLib(gameId: string) {
    this.libService.removeGame(gameId).subscribe({
      next: () => {
        this.cardEmitter.emit()
        this.toastr.success('The game was deleted from your library')
      },
      error: (err) => {
        this.toastr.error(err.message)
      }
    })
  }

  shareLink() {
    this.toastr.success('The link to the game was copied to the clipboard')
  }
}
