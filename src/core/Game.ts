import GameConfig from "./GameConfig";
import Square from "./Square";
import SquareGroup from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { Direction, GameStatus, GameViewer } from "./types";
import pageConfig from "./viewer/pageConfig";

export class Game {
    // 游戏状态
    private _gameStatus: GameStatus = GameStatus.init
    // 当前玩家操作的方块
    private _curTeris?: SquareGroup
    // 下一个方块
    private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 })
    // 定时器
    private _timer?: number
    // 
    private _duration: number = 1000

    private _downDatas: Square[] = []

    constructor (private _viewer: GameViewer) {
        this.resetCenterPoint(pageConfig.nextSize.width, this._nextTeris)
        this._viewer.showNext(this._nextTeris)
    }
    /**
     * 游戏开始
     */
    start() {
        // 游戏状态的改变
        if (this._gameStatus === GameStatus.playing) return
        this._gameStatus = GameStatus.playing
        if (!this._curTeris) {
            // 给当前玩家操作的方块赋值
            this.switchTeris()
        }
        this.autoDrop()
    }

    /**
     * 游戏暂停
     * @returns 
     */
    pause () {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause
            clearInterval(this._timer)
            this._timer = undefined
        }
    }

    control_left () {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, Direction.left, this._downDatas)
        }
    }
    control_right () {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, Direction.right, this._downDatas)
        }
    }
    control_down () {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirection(this._curTeris, Direction.down, this._downDatas)
        }
    }
    /**
     * 当前方块自由下落
     */
    private autoDrop () {
        if (this._timer || this._gameStatus !== GameStatus.playing) return
        this._timer = setInterval(() => {
            if (this._curTeris) {
                const isCd = TerisRule.move(this._curTeris, Direction.down, this._downDatas)
                console.log(isCd)
                if(!isCd) { // 触底了
                    this._downDatas = [...this._downDatas, ...this._curTeris.squares]
                    this.switchTeris()
                }
            }
        }, this._duration)
    }

    /**
     * 切换方块
     */
    private switchTeris () {
        this._curTeris = this._nextTeris
        this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris)
        this._nextTeris = createTeris({ x: 0, y: 0 })
        this.resetCenterPoint(pageConfig.nextSize.width, this._nextTeris)
        this._viewer.swtich(this._curTeris)
        this._viewer.showNext(this._nextTeris)
    }

    /**
     * 设置中心点坐标，已达到让该方块出现在区域的中上方
     * @param width 
     * @param teris 
     */
    private resetCenterPoint (width: number, teris: SquareGroup) {
        const x = Math.floor((width / 2) - 1)
        const y = 0
        teris.centerPoint = { x, y }
        while (teris.squares.some(it => it.point.y < 0)) {
            // TerisRule.move(teris, Direction.down)
            teris.squares.forEach(sq => sq.point = {
                x: sq.point.x,
                y: sq.point.y + 1
            })
        }
    }
}
