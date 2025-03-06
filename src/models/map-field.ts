interface CellOptions {
    coverBottom?: boolean
    coverLeft?: boolean
    coverRight?: boolean
    coverTop?: boolean
}

export class Cell {
    coverBottom = false
    coverLeft = false
    coverRight = false
    coverTop = false
    height = 0 // 0 = ground; 1 = high
    ladder = false // Does this cell have a ladder?
    ladderDirection = 0 // Only used if a ladder exists; clockwise with 0 at the top

    constructor( options: CellOptions ) {
        this.coverBottom = !!options.coverBottom
        this.coverLeft = !!options.coverLeft
        this.coverRight = !!options.coverRight
        this.coverTop = !!options.coverTop
    }
}

export class MapField {
    cells = [] as Cell[]
}
