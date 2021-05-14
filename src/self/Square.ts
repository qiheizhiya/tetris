import { IPoint, IViewer } from "./interface";

export default class Square {
  private _viewer!: IViewer

  get point () {
    return this._point
  }
  set point (val) {
    this._point = val
    this._viewer && this._viewer.show()
  }
  get viewer () {
    return this._viewer
  }
  set viewer (val) {
    this._viewer = val
    val && val.show()
  }
  get color () {
    return this._color
  }
  set color (val) {
    this._color = val
  }
  constructor (private _point: IPoint, private _color: string) {}
}