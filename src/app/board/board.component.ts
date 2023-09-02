import { Component, Input, inject } from '@angular/core';
import { Game } from '../models/game';
import { Observable, of } from 'rxjs';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  gameService = inject(GameService)
  playerService = inject(PlayerService)


  @Input() disabled: boolean = false

  selected: Array<number | null> = [null, null]

  availableMoves: any = []

  gm = new Game()
  @Input() game: any
  
  onMove(e: any, game: any) {
    if (game.board[e.previous.i][e.previous.j].color != game.turn) return
    if (this.playerService.getColor(game) != game.turn) return
    if (e.type = "drag") {
      e.color = game.turn
      this.gameService.move(e, game)
      
    }
    // if (!this.existsSelection()) {

    // }
    // else this.onSelect(i, j)
    this.availableMoves = []
    this.selected = [null, null]
  }

  isPlayerColor(pieceColor: any) {
    return this.playerService.getColor(this.game) == pieceColor
  }

  onStartDrag(e: any, game: any) {
    if (game.board[e.i][e.j].color != game.turn) return
    this.selected = [e.i, e.j]
    
    this.availableMoves = this.gameService.getAvailableMoves(game.board[e.i][e.j], e, this.game)
  }

  onSelect(i: number, j: number) {
    if (this.isSelected(i, j)) this.selected = [null, null] 
    else this.selected = [i, j]
  }

  existsSelection() {
    return this.selected[0] === null
  }

  isSelected(i: number, j: number) {
    return this.selected[0] == i && this.selected[1] == j
  }

  isLMP(i:number, j: number) {
    return this.game.lastMoves.previous.i == i && this.game.lastMoves.previous.j == j
  }

  isLMC(i:number, j: number) {
    return this.game.lastMoves.current.i == i && this.game.lastMoves.current.j == j
  }

  isAvailable(i: number, j: number) {
    return this.availableMoves.some((move: any) => move.i == i && move.j == j)
  }

  onDrop(e: any) {
  }
}
