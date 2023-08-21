import { Piece } from "../piece";

export class Empty extends Piece {
    
    constructor() {
        super()
    }

    override get() {
        return ''
    }
}
