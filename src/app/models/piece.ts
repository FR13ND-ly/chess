export abstract class Piece {

    public value: number = 0
    public color: string = ''
    public type: string = ''
    
    public getAvailableMoves(position: {i : number, j: number}, board: any) {}

    public get(): string {
        return this.color + this.type
    }

    public outOfBoundaries(position: any) {
        return position.i < 0 || position.j < 0 || position.i > 7 || position.j > 7 
    }
}
