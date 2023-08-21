import { Piece } from "../piece";

export class Knight extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 3
        this.type = 'n'
    }

    public override getAvailableMoves(position: { i: number; j: number; }, board: any) {
        let res: any = []
        let moves = [
            {i: position.i - 0 + 1, j : position.j - 0 + 2},
            {i: position.i - 0 + 1, j : position.j - 2},
            {i: position.i - 1, j : position.j - 0 + 2},
            {i: position.i - 1, j : position.j - 2},
            {i: position.i - 0 + 2, j : position.j - 0 + 1},
            {i: position.i - 2, j : position.j - 0 + 1},
            {i: position.i - 0 + 2, j : position.j - 1},
            {i: position.i - 2, j : position.j - 1},
        ]
        moves.forEach((move) => {
            if (!this.outOfBoundaries(move)&& board[move.i][move.j].color != this.color) {
                res.push(move)
            }
        })
        return res
    }

    
}
