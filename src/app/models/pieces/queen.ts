import { Piece } from "../piece";

export class Queen extends Piece {

    constructor(color: string) {
        super();
        this.color = color
        this.value = 9
        this.type = 'q'
    }
}
