export class Board {

    game: any

    constructor(game: any) {
        this.game = game
    }

    getField(position: any) {
        return this.game[position.i][position.j]
    }

    getAvailableMoves(e: any) {
        return this.getField(e.previous).getAvailableMoves(e.previous, this.game).filter(() => !this.getField(e.previous).isCheckMate(e.previous, e.current, this.game))
    }

    resolveMove(e: any) {
        let availableMoves = this.getAvailableMoves(e)
        let legalMove = availableMoves.find((move : any) => move.i == e.current.i && move.j == e.current.j)
        if (legalMove) {
            this.getField(e.previous).move(e.previous, legalMove, this.game)
            this.rotateBoard()
            if (!legalMove.enpassantable) this.removeEnpassantable()
        }
        return legalMove
    }

    rotateBoard() {
        let board = this.game
        board.map((row: any) => row.reverse())
        board = board.reverse()
    }

    removeEnpassantable() {
        let board = this.game
        board.forEach((row: any) => row.map((piece: any) => piece.enpassantable = false))
    }

}
