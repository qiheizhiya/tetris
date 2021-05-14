import GameConfig from './GameConfig'
import Square from './Square'
import SquareGroup from './SquareGroup'
import { Direction, IPoint, Shape } from './types'

function isPoint (obj: any): obj is IPoint {
    if (typeof obj.x === 'undefined') {
        return false
    }
    return true
}

export class TerisRule {
    /**
     * 判断某个形状的方块，是否能够移动到目标位置
     * @param shape 
     * @returns 
     */
    static canIMove (shape: Shape, targetPoint: IPoint, downSquares: Square[]): boolean {
        // 假设，中心点已经移动到了目标位置
        const targetSquarePoints: IPoint[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        // 边界判断
        let result = targetSquarePoints.some(p => {
            // 是否超出了边界
            return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1
        })
        if (result) return false
        result = targetSquarePoints.some(p => downSquares.some(sq => sq.point.x === p.x && sq.point.y === p.y))
        if (result) return false
        return true
    }
    static move(teris: SquareGroup, targetPoint: IPoint, downSquares: Square[]): boolean
    static move(teris: SquareGroup, direction: Direction, downSquares: Square[]): boolean
    static move(teris: SquareGroup, targetPointOrDirection: IPoint | Direction, downSquares: Square[]): boolean {
        // 如果是坐标，判断是否能跳转，能直接跳转，否贼返回
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(teris.shape, targetPointOrDirection, downSquares)) {
                teris.centerPoint = targetPointOrDirection
                return true
            }
            return false
        }
        // 如果是方向
        const direction = targetPointOrDirection
        let targetPoint: IPoint
        if (direction === Direction.down) {
            targetPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        } else if (direction === Direction.left) {
            targetPoint = {
                x: teris.centerPoint.x - 1,
                y: teris.centerPoint.y
            }
        } else {
            targetPoint = {
                x: teris.centerPoint.x + 1,
                y: teris.centerPoint.y
            }
        }
        return this.move(teris, targetPoint, downSquares)
    }

    /**
     * 将当前的方块，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirection(teris: SquareGroup, direction: Direction, downSquares: Square[]) {
        while(this.move(teris, direction, downSquares)) {}
    }

    static rotate(teris: SquareGroup, downSquares: Square[]): boolean {
        const newShape = teris.afterRotateShape()
        if (this.canIMove(newShape, teris.centerPoint, downSquares)) {
            teris.rotate()
            return true
        }
        return false
    }
}