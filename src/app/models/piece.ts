import { PieceFactory } from "./piece-factory"

export abstract class Piece {

    public value: number = 0
    public color: string = ''
    public type: string = ''
    public enpassantable: boolean = true
    public castleble: boolean = false
    pf : any

    constructor() {
        this.pf = new PieceFactory()
    }

    public getAvailableMoves(position: {i : number, j: number}, board: any): any {}

    public get(): string {
        return this.color + this.type
    }

    public outOfBoundaries(position: any) {
        return position.i < 0 || position.j < 0 || position.i > 7 || position.j > 7 
    }

    public move(previous: any, move: any, board: any) {
        board[move.i][move.j] = board[previous.i][previous.j]
        board[previous.i][previous.j] = this.pf.getPiece('')
    }
}
