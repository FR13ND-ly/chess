import { Piece } from "../piece";

export class Knight extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 3
        this.type = 'n'
    }
}
