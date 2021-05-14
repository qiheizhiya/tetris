import { IPoint } from "./interface";
import SquareGroup from "./SquareGroup";

export const LShape: IPoint[] = [
  { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
]

export const LOppositeShape: IPoint[] = [
  { x: 0, y: -1 }, { x: 0, y: 0 }, { x: -1, y: 0 }, { x: -2, y: 0 }
]

export const SShape: IPoint[] = [
  { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0 }
]

export const SOppositeShape: IPoint[] = [
  { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }
]

export const TianShape: IPoint[] = [
  { x: 0, y: -1 }, { x: 1, y: -1 }, { x: 0, y: 0 }, { x: 1, y: 0}
]

export const SoilShpae: IPoint[] = [
  { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }, { x: 1, y: 0 }
]

export const ErectShape: IPoint[] = [
  { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }
]

const shapes: IPoint[][] = [
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
export default function createTetris (centerPoint: IPoint) {
  let shape = shapes[getRandom(0, shapes.length)]
  let color = colors[getRandom(0, colors.length)]
  return new SquareGroup(shape, color, centerPoint)
}

/**
 * 取一个最大小和最小值之间的数，取不到最大值
 * @param min 
 * @param max 
 * @returns 
 */
function getRandom (min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}