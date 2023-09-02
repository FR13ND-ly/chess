import { PieceFactory } from "./piece-factory"

export abstract class Piece {

    public value: number = 0
    public color: string = ''
    public type: string = ''
    pf = new PieceFactory()

    constructor() {}

    public getAvailableMoves(position: {i : number, j: number}, board: any): any {}

    public get(): string {
        return this.color + this.type
    }

    public outOfBoundaries(position: any) {
        return position.i < 0 || position.j < 0 || position.i > 7 || position.j > 7 
    }

    public isCheckMate(previous: any, move: any, board$: any) {
        let board = JSON.parse(JSON.stringify(board$))
        let enemyColor = board[previous.i][previous.j].color == 'w' ? 'b' : 'w'
        board[move.i][move.j] = board[previous.i][previous.j]
        board[previous.i][previous.j] = this.pf.getPiece('')
        board.map((row : any) => row.reverse())
        board = board.reverse()
        let checkmate = false
        board.forEach((row: any, i: any) => {
            row.forEach((piece: any, j: any) => {
                if (!piece.value || piece.color != enemyColor) return
                this.pf.clone(piece).getAvailableMoves({i, j}, board).forEach((move: any) => {
                    if (
                        board[move.i][move.j].type == 'k' && 
                        board[move.i][move.j].color != enemyColor 
                    ) {
                        checkmate = true
                    }
                })
            })
        })
        return checkmate
    }

    public move(previous: any, move: any, board: any): any {
        board[move.i][move.j] = board[previous.i][previous.j]
        board[previous.i][previous.j] = this.pf.getPiece('')
    }
}
