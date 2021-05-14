export interface IPoint {
  x: number,
  y: number
}

export interface IViewer {
  show(): void
  remove(): void
}