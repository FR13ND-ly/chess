import { Component } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  selected: Array<number | null> = [null, null]

  gm = new Game()

  game$: Observable<any> = this.gm.getGame('id')

  onMove(e: any, game: any) {
    if (game.board[e.previous.i][e.previous.j].color != game.turn) return
    if (e.type = "drag") {
      this.gm.move(e, game.id)
      
    }
    // if (!this.existsSelection()) {

    // }
    // else this.onSelect(i, j)
    this.selected = [null, null]
  }

  onStartDrag(e: any, game: any) {
    if (game.board[e.i][e.j].color != game.turn) return
    this.selected = [e.i, e.j]
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

  onDrop(e: any) {
  }
}
