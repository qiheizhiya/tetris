import { IPoint } from "./interface";
import SquareGroup from "./SquareGroup";

export class LShape extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
    ], _color, _centerPoint)
  }
}

export class LOppositeShape extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }
    ], _color, _centerPoint)
  }
}

export class SShape extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }
    ], _color, _centerPoint)
  }
  rotate () {
    this._isClockwise = !this._isClockwise
    super.rotate()
  }
}

export class SOppositeShape extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }
    ], _color, _centerPoint)
  }
  rotate () {
    this._isClockwise = !this._isClockwise
    super.rotate()
  }
}

export class TianShape extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }
    ], _color, _centerPoint)
  }
  rotate () {
    return
  }
}

export class SoilShpae extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }
    ], _color, _centerPoint)
  }
}

export class ErectShape extends SquareGroup {
  constructor(_color: string, _centerPoint: IPoint) {
    super([
      { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
    ], _color, _centerPoint)
  }
  rotate () {
    this._isClockwise = !this._isClockwise
    super.rotate()
  }
}

const shapes = [
  LShape,
  LOppositeShape,
  SShape,
  SOppositeShape,
  TianShape,
  SoilShpae,
  ErectShape
]

const colors: string[] = [
  '#fff', '#FFE4C4', '#A52A2A', '#FF7F50', '#DC143C', '#8B008B', '#1E90FF'
]
/**
 * 俄罗斯方块生成函数
 * @param centerPoint 
 * @returns 
 */
export default function createTetris(centerPoint: IPoint) {
  let Shape = shapes[getRandom(0, shapes.length)]
  let color = colors[getRandom(0, colors.length)]
  return new Shape(color, centerPoint)
}

/**
 * 取一个最大小和最小值之间的数，取不到最大值
 * @param min 
 * @param max 
 * @returns 
 */
function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}