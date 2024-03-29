import { Piece } from "../piece";   

export class Pawn extends Piece {

    moved: boolean = false
    enpassantable: boolean = true
    
    constructor(color: string, enpassantable: any = false, moved: any = false) {
        super();
        this.color = color
        this.value = 1
        this.type = 'p',
        this.enpassantable = enpassantable
        this.moved = moved
    }

    public override getAvailableMoves(position: {i : number, j: number}, board: any): void {
        let res: any = []
        let moves: any = [
            {i: position.i - 1, j : position.j , hungry: false},
            {i: position.i - 1, j : position.j - 1, hungry: true},
            {i: position.i - 1, j : position.j + 1, hungry: true},
        ]
        if (!board[position.i][position.j].moved) {
            moves.push({...position, i: position.i - 2, hungry: false, enpassantable: true})
        }
        let enpassant = [
            {...position, j : position.j - 1},
            {...position, j : position.j + 1},
        ]
        moves.forEach((move: any) => {
            if (!this.outOfBoundaries(move)) {
                if (board[move.i][move.j].type == '' && !move.hungry) res.push(move)
                else if (board[move.i][move.j].type != '' && board[move.i][move.j].color != this.color && move.hungry) res.push(move)
            }
        })
        enpassant.forEach((move) => {
            if (!this.outOfBoundaries(move) && board[move.i][move.j].enpassantable && board[move.i][move.j].color != this.color) {
                res.push({...move, i: move.i - 1, enpassant: true}, )
            }
        })
        return res
    }


    override move(previous: any, move: any, board: any): any {
        if (move.enpassantable) board[previous.i][previous.j].enpassantable = true
        board[move.i][move.j] = board[previous.i][previous.j]
        board[move.i][move.j].moved = true
        if (move.i == 0) {
            board[move.i][move.j] = this.pf.getPiece(board[move.i][move.j].color + 'q')
        }
        board[previous.i][previous.j] = this.pf.getPiece('')
        if (move.enpassant) {
            board[previous.i][move.j] = this.pf.getPiece('')
        }
    }
}
