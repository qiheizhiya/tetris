import Square from "../core/Square";
import { shapes } from "../core/Teris";
import { IPoint, Shapes } from "./interface";
import Sqaure from "./Square";

export default class SquareGroup {
  private _squares: Sqaure[] = [] // 小方块的数组
  protected _isClockwise: boolean = true // 顺时针

  get squares () {
    return this._squares
  }

  get centerPoint () {
    return this._centerPoint
  }

  get shapes () {
    return this._shapes
  }

  set centerPoint (val) {
    this._centerPoint = val
    this.resetLocation()
  }

  // 设置位置
  private resetLocation () {
    this._shapes.forEach((shape, i) => {
      this._squares[i].point = {
        x: shape.x + this._centerPoint.x,
        y: shape.y + this._centerPoint.y
      }
    })
  }

  public afterRotateShape (): Shapes {
    if (this._isClockwise) { // 如果是顺时针
      return this._shapes.map(shape => ({
        x: -shape.y,
        y: shape.x
      }))
    } 
    return this._shapes.map(shape => ({
      x: shape.y,
      y: -shape.x
    }))
  }

  public rotate () {
    this._shapes = this.afterRotateShape()
    this.resetLocation()
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

