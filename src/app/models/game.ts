import { Board } from "./board"
import { PieceFactory } from "./piece-factory"
export class Game {

    pf = new PieceFactory()

    move(e: any, game: any) {
        let board = new Board(game.board)
        if (board.resolveMove(e)) {
            game.turn = game.turn == 'b' ? 'w' : 'b'
            game.board = board.game
            if (this.checkCheckmate(game.turn, game.board)) {
                game.state = game.turn == 'b' ? 'w' : 'b'
            }
        }
        return game
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
}
