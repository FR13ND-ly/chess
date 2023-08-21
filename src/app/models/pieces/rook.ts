import { Piece } from "../piece";

export class Rook extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 5
        this.type = 'r'
    }
}
