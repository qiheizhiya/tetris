import SquareGroup from './SquareGroup'
import { IPoint, Shape } from './types'
import { getRandom } from './utils'

export class TShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }], _centerPoint, color)
    }
}

export class LShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, color)
    }
}

export class LMirrorShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }], _centerPoint, color)
    }
}

export class SShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }], _centerPoint, color)
    }
    rotate () {
        super.rotate();
        this.isClock = !this.isClock
    }
}

export class SMirrorShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, color)
    }
}

export class SquareShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], _centerPoint, color)
    }
    afterRotateShape () {
        return this.shape
    }
}

export class LineShape extends SquareGroup {
    constructor (_centerPoint: IPoint, color: string) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }], _centerPoint, color)
    }
}


export const shapes = [
    TShape, LShape, LMirrorShape, SShape, SMirrorShape, SquareShape, LineShape
]

export const colors = ['#F16B16', '#D65C74', '#D73E92', '#082490', '#C270E8', '#1E5B6C', '#0F50F8', '#0F50F8', '#351241', '#B6A126']

/**
 * 随机产生一个俄罗斯方块（颜色随机，形状随机）
 * @param centerPoint 
 */
export function createTeris(centerPoint: IPoint): SquareGroup {
    let index = getRandom(0, shapes.length)
    const Shape = shapes[index]
    index = getRandom(0, colors.length)
    const color = colors[index]
    return new Shape(centerPoint, color)
}

