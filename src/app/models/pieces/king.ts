import { Piece } from "../piece";

export class King extends Piece {

    constructor(color: string, castleble: any = true) {
        super();
        this.color = color
        this.value = 1000
        this.type = 'k'
        this.castleble = castleble
    }


    public override getAvailableMoves(position: { i: number; j: number; }, board: any) {
        let res: any = []
        let moves = [
            { i : position.i, j: position.j + 1 },
            { i : position.i, j: position.j - 1 },
            { i : position.i + 1, j: position.j },
            { i : position.i - 1, j: position.j },
            { i : position.i + 1, j: position.j + 1 },
            { i : position.i - 1, j: position.j + 1 },
            { i : position.i + 1, j: position.j - 1 },
            { i : position.i - 1, j: position.j - 1 }
        ]
        moves.forEach((move) => {
            if (!this.outOfBoundaries(move)&& board[move.i][move.j].color != this.color) {
                res.push(move)
            }
        })
        if (this.castleble) {
            if (board[7][7].value == 5 && board[7][7].castleble && !board[7][6].value && !board[7][5].value) {
                res.push({i: 7, j: 7, castle: true})
                res.push({i: 7, j: 6, castle: true})
            }
            if (board[7][0].value == 5 && board[7][0].castleble && !board[7][1].value && !board[7][2].value && !board[7][3].value) {
                res.push({i: 7, j: 0, castle: true})
                res.push({i: 7, j: 2, castle: true})
            }
        }
        return res

    }
    
    override move(previous: any, move: any, board: any): any {
        board[previous.i][previous.j].castleble = false
        if (move.castle) {
            if (move.j == 0) {
                board[7][2] = board[previous.i][previous.j]
                board[7][3] = board[7][0]
                board[previous.i][previous.j] = this.pf.getPiece('')
                board[7][0]= this.pf.getPiece('')
            }
            else {
                board[7][6] = board[previous.i][previous.j]
                board[7][5] = board[7][7]
                board[previous.i][previous.j] = this.pf.getPiece('')
                board[7][7]= this.pf.getPiece('')
            }
        }
        else {   
            board[move.i][move.j] = board[previous.i][previous.j]
            board[previous.i][previous.j] = this.pf.getPiece('')
        }
    }
}
