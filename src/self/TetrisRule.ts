import { IPoint, moveDirection, Shapes } from "./interface";
import { panelSize } from "./viewer/setting";
import SquareGroup from "./SquareGroup";
import Square from "./Square";

function isPoint(obj: any): obj is IPoint {
    if (typeof obj.x === 'undefined') return false
    return true
}

function getTargetPoint(tetris: SquareGroup, direction: moveDirection) {
    switch (direction) {
        case moveDirection.down:
            return {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
        case moveDirection.left:
            return {
                x: tetris.centerPoint.x - 1,
                y: tetris.centerPoint.y
            }
        case moveDirection.right:
            return {
                x: tetris.centerPoint.x + 1,
                y: tetris.centerPoint.y
            }   
        default:
            return {
                x: tetris.centerPoint.x,
                y: tetris.centerPoint.y + 1
            }
    }
}

export default class TetrisRule {
    /**
     * 是否能旋转
     * @param shapes 
     * @param targetPoint 
     * @returns true：能旋转 false：不能旋转
     */
    static canImove(shapes: Shapes, targetPoint: IPoint, downTetris: Square[]): boolean {
        const currentPoints: Shapes = shapes.map(shape => ({
            x: shape.x + targetPoint.x,
            y: shape.y + targetPoint.y
        }))
        let isImmovable: boolean = currentPoints.some(sq => sq.x < 0 || sq.y < 0 || sq.x >= panelSize.width || sq.y >= panelSize.height) // false：能移动 true：不能移动
        if (isImmovable) return false // 不能移动
        isImmovable = currentPoints.some(poi => downTetris.some(sq => sq.point.x === poi.x && sq.point.y === poi.y))
        if (isImmovable) return false // 不能移动
        return true
    }
    
    /**
     * 移动到指定坐标，支持方向和目标点
     * @param tetris 
     * @param targetPoint 
     */
    static move(tetris: SquareGroup, targetPoint: IPoint, downTetris: Square[]): boolean
    static move(tetris: SquareGroup, direction: moveDirection, downTetris: Square[]): boolean
    static move(tetris: SquareGroup, targetPointOrDirection: IPoint | moveDirection, downTetris: Square[]): boolean {
        if (isPoint(targetPointOrDirection)) { // 是不是一个坐标
            if (this.canImove(tetris.shapes, targetPointOrDirection, downTetris)) {
                tetris.centerPoint = targetPointOrDirection
                return true
            }
            return false
        }
        const targetPoint: IPoint = getTargetPoint(tetris, targetPointOrDirection)
        return this.move(tetris, targetPoint, downTetris)
    }

    static moveBottom (tetris: SquareGroup, direction: moveDirection, downTetris: Square[]) {
        while(this.move(tetris, direction, downTetris)) {}
    }

    static rotate (tetris: SquareGroup, downTetris: Square[]) {
        const shapes = tetris.afterRotateShape()
        if (this.canImove(shapes, tetris.centerPoint, downTetris)) {
            tetris.rotate()
        }
    }

    static deleteSquare(exists: Square[], panelWidth: number): number {
        // y 坐标数组
        const ys = exists.map(sq => sq.point.y)
        // 获取最小和最大的y坐标
        const minY = Math.min(...ys)
        const maxY = Math.max(...ys)
        let num: number = 0
        for(let y = minY; y <= maxY; y++) {
            if (this.deleteLine(exists, y, panelWidth)) {
                // 如果删除成功
                num++
            }
        }
        console.log(num)
        return num
    }

    static deleteLine (exists: Square[], y: number, panelWidth: number): boolean {
        // 拿到这一行的方块
        const squares = exists.filter(sq => sq.point.y === y)
        if (squares.length === panelWidth) {
            // 这一行可以消除
            squares.forEach(sq => {
                // 1. 从界面上移除
                sq.viewer.remove()

                // 2. 从数据里面移除
                const index = exists.indexOf(sq)
                exists.splice(index, 1)
            })
            // 2.  剩下的，y坐标比当前的y小的方块，y+1
            exists.filter(sq => sq.point.y < y).forEach(sq => sq.point = {
                x: sq.point.x,
                y: sq.point.y + 1
            })
            return true
        }
        return false
    }

}