import SquareGroup from '../SquareGroup';
import SquareViewer from './SquareViewer'
import $ from 'jquery'
import { gameViewer, size } from '../interface';
import { nextSize, panelSize } from './setting';

export default class GameViewer implements gameViewer {
    private _nextSize = nextSize
    private _panelSize: size = panelSize
    get nextSize () {
        return this._nextSize
    }
    get panelSize () {
        return this._panelSize
    }
    showCur(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer.remove()
            sq.viewer = new SquareViewer(sq, $('#panel'))
        })
    }
    showNext(tetris: SquareGroup): void {
        tetris.squares.forEach(sq => {
            sq.viewer = new SquareViewer(sq, $('#next'))
        })
    }
}