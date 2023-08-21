import { Piece } from "../piece";

export class King extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 1000
        this.type = 'k'
    }


    public override getAvailableMoves(position: { i: number; j: number; }, board: any) {
        let res: any = []
        let moves = [
            { i : position.i - 0, j: position.j - 0 + 1 },
            { i : position.i - 0, j: position.j - 1 },
            { i : position.i - 0 + 1, j: position.j - 0 },
            { i : position.i - 1, j: position.j - 0  },
            { i : position.i - 0 + 1, j: position.j - 0 + 1 },
            { i : position.i - 1, j: position.j - 0 + 1 },
            { i : position.i -0 + 1, j: position.j - 1 },
            { i : position.i - 1, j: position.j - 1 }
          ]
        moves.forEach((move) => {
            if (!this.outOfBoundaries(move)&& board[move.i][move.j].color != this.color) {
                res.push(move)
            }
        })
        return res
    }

}
