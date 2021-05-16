import SquareGroup from "./SquareGroup";

export interface IPoint {
  readonly x: number,
  readonly y: number
}

export interface IViewer {
  show(): void
  remove(): void
}

export type Shapes = IPoint[]

export enum moveDirection {
  down,
  left,
  right
}

export enum gameStatus {
  init, // 未开始
  playing, // 游戏中
  pause, // 暂停
  over, // 游戏结束
}

export interface gameViewer {
  showCur(tetris: SquareGroup): void
  showNext(tetris: SquareGroup): void
  nextSize: size
  panelSize: size
}

export type size = {
  readonly width: number,
  readonly height: number
}