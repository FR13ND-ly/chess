import { Board } from "./board"
import { PieceFactory } from "./piece-factory"
import { BehaviorSubject, map } from "rxjs";
export class Game {

    pf = new PieceFactory()

    games = new BehaviorSubject({
        a : {
            state: '',
            turn: 'w',
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
    })

    move(e: any, id: any) {
        let game = this.games.value.a
        let board = new Board(game.board)
        if (board.resolveMove(e)) {
            game.turn = game.turn == 'b' ? 'w' : 'b'
            game.board = board.game
            this.games.next({...this.games.value, a: game})
            if (this.checkCheckmate(game.turn, game.board)) {
                alert(game.turn + ' lost')
            }
        }
    }

    public checkCheckmate(color: any, board$: any) {
        let board = JSON.parse(JSON.stringify(board$))
        let checkmate = true
        board.forEach((row: any, i: any) => {
            row.forEach((piece: any, j: any) => {
                if (!piece.value || piece.color != color) return
                let p = this.pf.clone(piece)
                let moves = p.getAvailableMoves({i, j}, board).filter((m: any) => {
                    return !p.isCheckMate({i, j}, m, board)
                })
                if (moves.length) {
                    checkmate = false
                }
            })
        })
        return checkmate
    }

    getGame(id : string) {
        return this.games.pipe(map((a) => a.a))
    }
}
