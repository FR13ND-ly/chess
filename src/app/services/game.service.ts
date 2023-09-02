import { Injectable, inject } from '@angular/core';
import { getDatabase, ref, update, push, onValue, get, set, remove } from "firebase/database";
import { UtilsService } from './utils.service';
import { from, map, BehaviorSubject } from 'rxjs'
import { Game } from '../models/game';
import { PlayerService } from './player.service';
import { ChessBotService } from './chess-bot.service';
import { PieceFactory } from '../models/piece-factory';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  utilsService = inject(UtilsService)
  playerService = inject(PlayerService)
  chessBot = inject(ChessBotService)
  router = inject(Router)

  pf = new PieceFactory

  gm = new Game()

  private db = getDatabase();
  game$ = new BehaviorSubject<any>(null)

  getId() {
    return this.utilsService.generateId()
  }

  getGame(id: any) {
    onValue(ref(this.db, 'games/' + id), (snapshot): any => {
      if (!snapshot.val().id) {
        this.game$.next(null)
        alert("Game not found")
        return this.router.navigate(["/"])
      }
      this.game$.next(this.resolveGame(snapshot))
    })
    return this.game$.asObservable()
  } 

  async newGame(game: any) {
    await set(ref(this.db, 'games/' + game.id), game)
  }

  async joinGame(id: any, player: any) {
    await update(ref(this.db, 'games/' + id), {player2: player})
  }

  async move(data: any, game : any) {
    let res = this.gm.move(data, game)
    if (this.playerService.getColor(game) == 'b') {
      res.board = this.rotateBoard(res.board)
    }
    res.lastMoves = data
    await update(ref(this.db, 'games/' + game.id), res)
    if (game.player2.id == 'ai') {
      this.chessBot.makeMove(game)
    }
  }

  exists() {

  }

  getAvailableMoves(piece: any, pos: any, game: any) {
    return this.pf.clone(piece).getAvailableMoves(pos, game.board)
  }

  resolveGame(data: any) {
    let game = data.val()
    let playerColor = this.playerService.getColor(game)
    if (playerColor == 'b') {
      game.board = game.board.map((row: any) => row.reverse())
      game.board = game.board.reverse()
    }
    if (playerColor != game.lastMoves.color) {
      game.lastMoves.previous = {
        i : 7 - game.lastMoves.previous.i,
        j : 7 - game.lastMoves.previous.j
      },
      game.lastMoves.current = {
        i : 7 - game.lastMoves.current.i,
        j : 7 - game.lastMoves.current.j
      }
    }
    return game
  }

  rotateBoard(board: any) {
    board = board.map((row: any) => row.reverse())
    board = board.reverse()
    return board
  }

}
