import { IPoint, IViewer } from "../interface";
import { sqaureSetting } from "./setting";
import Sqaure from "../Square";
import $ from 'jquery'

export default class SquareViewer implements IViewer {
  private _dom!: JQuery<HTMLElement>
  private _isRemove: boolean = false

  show(): void {
    if (this._isRemove) return // 如果被删除了，不显示了
    if (!this._dom) {
      this._dom = $('<div>').css({
        position: 'absolute',
        width: sqaureSetting.width,
        height: sqaureSetting.height,
        // left: this._square.point.x * sqaureSetting.width,
        // top: this._square.point.y * sqaureSetting.height,
        transform: `translate(${this._square.point.x * sqaureSetting.width}px, ${this._square.point.y * sqaureSetting.height}px)`,
        background: this._square.color,
        border: '1px solid #ccc',
        boxSizing: 'border-box'
      }).appendTo(this._el)
    }
    this._dom.css({
      transform: `translate(${this._square.point.x * sqaureSetting.width}px, ${this._square.point.y * sqaureSetting.height}px)`,
    })
  }
  remove(): void {
    this._dom && this._dom.remove()
    this._isRemove = true
  }

  constructor (private _square: Sqaure, private _el: JQuery<HTMLElement>) {}
}