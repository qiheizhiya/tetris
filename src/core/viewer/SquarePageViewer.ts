import Square from "../Square";
import SquareConfig from './pageConfig'
import { IViewer } from "../types";
import $ from 'jquery'

export class SquarePageViewer implements IViewer {
    private dom?: JQuery<HTMLElement>
    private isRemove: Boolean = false
    show(): void {
        if (this.isRemove) return
        if (!this.dom) {
            this.dom = $('<div>').css({
                position: 'absolute',
                width: SquareConfig.SquareSize.width,
                height: SquareConfig.SquareSize.height,
                background: this.square.color,
                border: '1px solid #ccc',
                boxSizing: 'border-box'
            }).appendTo(this.container)
        }
        this.dom.css({
            top: this.square.point.y * SquareConfig.SquareSize.height,
            left: this.square.point.x * SquareConfig.SquareSize.width
        })
    }
    remove(): void {
        this.dom && this.dom.remove()
        this.isRemove = true
    }
    
    constructor (private square: Square, private container: JQuery<HTMLElement>) {}
}