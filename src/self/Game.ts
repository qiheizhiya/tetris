import { gameStatus, gameViewer, IPoint, moveDirection, IViewer } from './interface';
import Square from './Square';
import SquareGroup from './SquareGroup';
import createTetris from './Tetris';
import TetrisRule from './TetrisRule';

export default class Game {
    private _gameStatus: gameStatus = gameStatus.init
    private _timer?: number
    private _duration: number = 800
    private _currentTetris?: SquareGroup
    private _nextTetris: SquareGroup = createTetris({ x: 0, y: 0 })
    private _downTetris: Square[] = [] // 到底的方块


    constructor (private _viewer: gameViewer) {
        this._viewer.showNext(this._nextTetris)
    }

    private setPosition (width: number, tetris: SquareGroup) {
        const x = Math.floor((width / 2) - 1)
        const y = 0
        tetris.centerPoint = { x, y }
        while (tetris.squares.some(it => it.point.y < 0)) {
            // TerisRule.move(teris, Direction.down)
            tetris.centerPoint = { x, y: y + 1 }
        }
    }

    public control_left () {
        if (this._currentTetris && this._gameStatus === gameStatus.playing) {
            TetrisRule.move(this._currentTetris, moveDirection.left, this._downTetris)
        }
    }

    public control_right () {
        if (this._currentTetris && this._gameStatus === gameStatus.playing) {
            TetrisRule.move(this._currentTetris, moveDirection.right, this._downTetris)
        }
    }

    public control_down () {
        if (this._currentTetris && this._gameStatus === gameStatus.playing) {
            TetrisRule.moveBottom(this._currentTetris, moveDirection.down, this._downTetris)
            // 触底
            this.hitBottom()
        }
    }

    public control_rotate () {
        if (this._currentTetris && this._gameStatus === gameStatus.playing) {
            TetrisRule.rotate(this._currentTetris, this._downTetris)
        }
    }

    public start (): void {
        if (this._gameStatus === gameStatus.playing) return
        this._gameStatus = gameStatus.playing
        if (!this._currentTetris) {
            this.switchTetris()
        }
        this.autoDown()
    }

    public pause (): void {
        if (this._gameStatus === gameStatus.playing) {
            clearInterval(this._timer)
            this._timer = undefined
        }
    }

    public autoDown (): void {
        if (this._gameStatus !== gameStatus.playing || this._timer) return
        this._timer = setInterval(() => {
            if (!this._currentTetris) return
            const isMove = TetrisRule.move(this._currentTetris, moveDirection.down, this._downTetris)
            if (!isMove) { // 触底了我考
                this.hitBottom()
            }
        }, this._duration)

    }

    public switchTetris () {
        this._currentTetris = this._nextTetris
        this.setPosition(this._viewer.panelSize.width, this._currentTetris)
        this._nextTetris = createTetris({ x: 0, y: 0 })
        this.setPosition(this._viewer.nextSize.width, this._nextTetris)
        this._viewer.showNext(this._nextTetris)
        this._viewer.showCur(this._currentTetris)
    }

    private hitBottom () {
        this._downTetris = [...this._downTetris, ...this._currentTetris!.squares]
        TetrisRule.deleteSquare(this._downTetris, this._viewer.panelSize.width)
        this.switchTetris()
    }

    public eliminate() {
        const map = new Map()
        this._downTetris.forEach((sq, index) => {
            if (map.get(sq.point.y)) {
                const data = map.get(sq.point.y)
                map.set(sq.point.y, {
                    count: data.count + 1,
                    viewers: [...data.viewers, sq.viewer],
                    indexs: [...data.indexs, index]
                })
                return
            }
            map.set(sq.point.y, {
                count: 1,
                viewers: [sq.viewer],
                indexs: [index]
            })
        })
        console.log(map)
        map.forEach((val, key) => {
            if (val.count === this._viewer.panelSize.width) {
                val.viewers.forEach((viewer: IViewer, index: number) => {
                    viewer.remove()
                    const dataIndex: number = val.indexs[index]
                    this._downTetris.splice(dataIndex, 1)
                    for(let i = dataIndex + 1; i < val.indexs.length; i++) {
                        val.indexs[i]--
                    }
                })
                this._downTetris.forEach(sq => {
                    if (sq.point.y < key) {
                        sq.point = {
                            x: sq.point.x,
                            y: sq.point.y + 1
                        }
                    }
                })
            }
        })
        console.log(this._downTetris)
    }

}