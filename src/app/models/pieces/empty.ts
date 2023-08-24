import { Piece } from "../piece";

export class Empty extends Piece {
    
    constructor() {
        super()
        this.value = 0
    }

    override get() {
        return ''
    }
}
