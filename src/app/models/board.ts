import { inject } from "@angular/core"
import { PieceFactory } from "./piece-factory"
import { PlayerService } from "../services/player.service"

export class Board {

    pf = new PieceFactory()
    game: any

    constructor(game: any) {
        this.game = game
    }

    getField(position: any) {
        console.log(this.game[position.i][position.j])
        return this.pf.clone(this.game[position.i][position.j])
    }

    getAvailableMoves(e: any) {
        return this.getField(e.previous).getAvailableMoves(e.previous, this.game).filter(() => !this.getField(e.previous).isCheckMate(e.previous, e.current, this.game))
    }

    resolveMove(e: any) {
        let availableMoves = this.getAvailableMoves(e)
        let legalMove = availableMoves.find((move : any) => move.i == e.current.i && move.j == e.current.j)
        if (legalMove) {
            this.getField(e.previous).move(e.previous, legalMove, this.game)
            if (!legalMove.enpassantable) this.removeEnpassantable()
        }
        return legalMove
    }

    removeEnpassantable() {
        let board = this.game
        board.forEach((row: any) => row.map((piece: any) => piece.enpassantable = false))
    }

}
