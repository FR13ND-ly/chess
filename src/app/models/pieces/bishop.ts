import { Piece } from "../piece";

export class Bishop extends Piece {

    
    constructor(color: string) {
        super();
        this.color = color
        this.value = 3
        this.type = 'b'
    }

    public override getAvailableMoves(position: { i: number; j: number; }, board: any) {
        let res: any = []
        let moves = [
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]
        ]
        moves.forEach((move) => {
            let resistance = false
            let newPosition = {i : position.i + move[0], j : position.j + move[1]}
            while (!this.outOfBoundaries(newPosition) && !resistance && board[newPosition.i][newPosition.j].color != this.color) {
                res.push(newPosition)
                if (board[newPosition.i][newPosition.j].type != '') {
                    resistance = true
                }
                newPosition = {i : newPosition.i + move[0], j : newPosition.j + move[1]}
            }
        })
        return res
    }
}
