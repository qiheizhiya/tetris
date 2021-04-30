import Square from './Square'
import { IPoint, Shape } from './types'

export default class SquareGroup {
    private _squares: readonly Square[] = []

    public get squares () {
        return this._squares
    }

    public set squares (val) {
        this._squares = val
    }

    public get shape () {
        return this._shape
    }

    public set shape (val) {
        this._shape = val
    }

    public get centerPoint () {
        return this._centerPoint
    }

    private setSquaresPoint () {
        this._shape.forEach((it, i) => {
            this._squares[i].point = {
                x: this._centerPoint.x + it.x,
                y: this._centerPoint.y + it.y
            }
        })
    }

    public set centerPoint (val) {
        this._centerPoint = val
        this.setSquaresPoint()
    }

    constructor (private _shape: Shape, private _centerPoint: IPoint, private color: string) {
        const arr: Square[] = []
        this._shape.forEach(({x, y}) => {
            const sq = new Square()
            sq.color = this.color
            arr.push(sq)
        })
        this._squares = arr
        this.setSquaresPoint()
    }
}
