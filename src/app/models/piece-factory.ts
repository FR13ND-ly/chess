import { Piece } from "./piece"
import { Bishop } from "./pieces/bishop"
import { Empty } from "./pieces/empty"
import { King } from "./pieces/king"
import { Knight } from "./pieces/knight"
import { Pawn } from "./pieces/pawn"
import { Queen } from "./pieces/queen"
import { Rook } from "./pieces/rook"

export class PieceFactory {

    getPiece(piece: string) : Piece {
        let color = piece.charAt(0)
        switch (piece.charAt(1)) {
            case 'p':
                return new Pawn(color)
            case 'n':
                return new Knight(color)
            case 'b':
                return new Bishop(color)
            case 'r':
                return new Rook(color)
            case 'q':
                return new Queen(color)
            case 'k':
                return new King(color)
            default:
                return new Empty
        }
    }
}
