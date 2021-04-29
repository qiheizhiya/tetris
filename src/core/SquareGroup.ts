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

    constructor (private _shape: Shape, private _centerPoint: IPoint, color: string) {
        this._shape.forEach(it => {

        })
    }
}