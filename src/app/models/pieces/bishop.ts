import { Piece } from "../piece";

export class Bishop extends Piece {

    
    constructor(color: string) {
        super();
        this.color = color
        this.value = 3
        this.type = 'b'
    }
}
