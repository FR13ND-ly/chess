import { Piece } from "../piece";
import { PieceFactory } from "../piece-factory";

export class Pawn extends Piece {

    moved: boolean = false
    
    constructor(color: string) {
        super();
        this.color = color
        this.value = 1
        this.type = 'p'
    }

    public override getAvailableMoves(position: {i : number, j: number}, board: any): void {
        let res: any = []
        let moves: any = [
            {...position, i: position.i - 1, j : position.j - 0, hungry: false},
            {...position, i: position.i - 1, j : position.j - 1, hungry: true},
            {...position, i: position.i - 1, j : position.j + 1, hungry: true},
        ]
        if (!this.moved) {
            moves.push({...position, i: position.i - 2, j : position.j - 0, hungry: false, enpassantable: true})
        }
        let enpassant = [
            {...position, i: position.i, j : position.j - 1},
            {...position, i: position.i, j : position.j + 1},
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


    override move(previous: any, move: any, board: any) {
        if (move.enpassantable) board[previous.i][previous.j].enpassantable = true
        board[previous.i][previous.j].moved = true
        board[move.i][move.j] = board[previous.i][previous.j]
        board[previous.i][previous.j] = this.pf.getPiece('')
        if (move.enpassant) {
            board[previous.i][move.j] = this.pf.getPiece('')
        }
        
    }
}
