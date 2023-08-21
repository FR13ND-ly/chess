import { Piece } from "../piece";

export class King extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 1000
        this.type = 'k'
    }
}
