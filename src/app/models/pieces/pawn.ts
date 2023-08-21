import { Piece } from "../piece";

export class Pawn extends Piece {
    
    constructor(color: string) {
        super();
        this.color = color
        this.value = 1
        this.type = 'p'
    }

    public override getAvailableMoves(position: {i : number, j: number}, board: any): void {
        let res: any = []
        let moves = [{...position, j: position.j - 1}]
        console.log(moves)
        moves.forEach((move) => {
            if (!this.outOfBoundaries(move) && board[move.i][move.j].type == ''){
                res.push(move)
            }
        })
        return res
    }
}
