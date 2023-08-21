import { Component } from '@angular/core';
import { PieceFactory } from '../models/piece-factory';
import { game } from '../models/game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  selected: Array<number | null> = [null, null]

  pf = new PieceFactory()

  game : game = {
    board : [
      [this.pf.getPiece('br'), this.pf.getPiece('bn'), this.pf.getPiece('bb'), this.pf.getPiece('bq'), this.pf.getPiece('bk'), this.pf.getPiece('bb'), this.pf.getPiece('bn'), this.pf.getPiece('br')],
      [this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp')],
      [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
      [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('wk'), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
      [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
      [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
      [this.pf.getPiece('wp'), this.pf.getPiece('bp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp')],
      [this.pf.getPiece('wr'), this.pf.getPiece('wn'), this.pf.getPiece('wb'), this.pf.getPiece('wq'), this.pf.getPiece('wk'), this.pf.getPiece('wb'), this.pf.getPiece('wn'), this.pf.getPiece('wr')],
    ]
  }

  onMove(e: any) {
    if (e.type = "drag") {
      // this.game.board[e.current.i][e.current.j] = this.game.board[e.previous.i][e.previous.j]
      // this.game.board[e.previous.i][e.previous.j] = this.pf.getPiece('')
      let availableMoves = this.game.board[e.previous.i][e.previous.j].getAvailableMoves(e.previous, this.game.board)
      let legalMove = availableMoves.filter((move : any) => move.i == e.current.i && move.j == e.current.j)
      if (legalMove.length) this.game.board[e.previous.i][e.previous.j].move(e.previous, legalMove[0], this.game.board)
    }
    // if (!this.existsSelection()) {

    // }
    // else this.onSelect(i, j)
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
    console.log(e)
  }
}
