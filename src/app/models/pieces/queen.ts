import { Piece } from "../piece";

export class Queen extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 9
        this.type = 'q'
    }

    public override getAvailableMoves(position: { i: number; j: number; }, board: any) {
        let res: any = []
        let moves = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
            [1, 1],
            [-1, 1],
            [1, -1],
            [-1, -1]
        ]
        moves.forEach((move) => {
            let resistance = false
            let newPosition = {i : position.i - 0 + move[0], j : position.j - 0 + move[1]}
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
