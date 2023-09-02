import { Component, inject } from '@angular/core';
import { PieceFactory } from '../models/piece-factory';
import { GameService } from '../services/game.service';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  pf = new PieceFactory()
  gameService = inject(GameService)
  playerService = inject(PlayerService)
  router = inject(Router)

  continue = false
  nickname = this.playerService.getUsername()

  joinGame = {
    id : '',
    player: {
      id: this.playerService.getId(),
      username: this.playerService.getUsername()
    }
  }

  game = {
    id: this.gameService.getId(),
    player1: {
        id: this.playerService.getId(),
        username: this.playerService.getUsername()
    },
    player2: {
      id: '',
      username: ''
    },
    lastMoves: {
      color: 'w',
      previous: {
        i: -1,
        j: -1
      },
      current: {
        i: -1,
        j: -1
      },
    },
    state: '',
    turn: 'w',
    moveNumber: 0,
    playerToStart: '',
    chat: [],
    board: [
        [this.pf.getPiece('br'), this.pf.getPiece('bn'), this.pf.getPiece('bb'), this.pf.getPiece('bq'), this.pf.getPiece('bk'), this.pf.getPiece('bb'), this.pf.getPiece('bn'), this.pf.getPiece('br')],
        [this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp'), this.pf.getPiece('bp')],
        [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
        [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
        [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
        [this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece(''), this.pf.getPiece('')],
        [this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp'), this.pf.getPiece('wp')],
        [this.pf.getPiece('wr'), this.pf.getPiece('wn'), this.pf.getPiece('wb'), this.pf.getPiece('wq'), this.pf.getPiece('wk'), this.pf.getPiece('wb'), this.pf.getPiece('wn'), this.pf.getPiece('wr')],
    ]
  }

  onCreateGame(player2Id : string = '') {
    this.game.player2.id = player2Id
    this.gameService.newGame(this.game)
    this.router.navigate(['play', this.game.id])
  }

  onJoin() {
    this.gameService.joinGame(this.joinGame.id, this.joinGame.player)
    this.router.navigate(['play', this.joinGame.id])
  }
}
