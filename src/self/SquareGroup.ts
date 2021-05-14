import Square from "../core/Square";
import { shapes } from "../core/Teris";
import { IPoint } from "./interface";
import Sqaure from "./Square";

export default class SquareGroup {
  private _squares: Sqaure[] = [] // 小方块的数组

  get squares () {
    return this._squares
  }

  get centerPoint () {
    return this._centerPoint
  }

  set centerPoint (val) {
    this._centerPoint = val
    this.resetLocation()
  }
  resetLocation () {
    this._shapes.forEach((shape, i) => {
      this._squares[i].point = {
        x: shape.x + this._centerPoint.x,
        y: shape.y + this._centerPoint.y
      }
    })
  }

  constructor (private _shapes: IPoint[], private _color: string, private _centerPoint: IPoint) {
    this._squares = this._shapes.map(shape => {
      const point: IPoint = {
        x: shape.x + this._centerPoint.x,
        y: shape.y + this._centerPoint.y
      }
      return new Sqaure(point, this._color)
    })
  }
}

