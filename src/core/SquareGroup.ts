import Square from './Square'
import { IPoint, Shape } from './types'

export default class SquareGroup {
    private _squares: readonly Square[] = [] // 方块位置数组
    
    public get squares () {
        return this._squares
    }

    public set squares (val) {
        this._squares = val
    }

    // 方块类型
    public get shape () {
        return this._shape
    }

    public set shape (val) {
        this._shape = val
    }

    // 中心点
    public get centerPoint () {
        return this._centerPoint
    }

    // 设置方块的位置
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
        this._shape.forEach(() => {
            const sq = new Square()
            sq.color = this.color
            arr.push(sq)
        })
        this._squares = arr
        this.setSquaresPoint()
    }
    protected isClock = true // 顺时针， false 逆时针

    afterRotateShape(): Shape {
        if (this.isClock) {
            return this._shape.map(p => ({
                x: -p.y,
                y: p.x
            }))
        }
        return this._shape.map(p => ({
            x: p.y,
            y: -p.x
        }))
    }

    rotate () {
        const newShape = this.afterRotateShape()
        this._shape = newShape
        this.setSquaresPoint()
    }
}
