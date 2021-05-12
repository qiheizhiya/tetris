import SquareGroup from "./SquareGroup";

export interface IPoint {
    readonly x: number,
    readonly y: number
}

export interface IViewer {
    show(): void
    remove(): void
}

export type Shape = IPoint[]

export enum Direction {
    left,
    right,
    down
}

export enum GameStatus {
    init, // 未开始
    playing, // 进行中
    pause, // 暂停
    over // 游戏结束
}

export interface GameViewer {
    /**
     * 
     * @param teris 下一个方块对象
     */
    showNext(teris: SquareGroup): void

    /**
     * 切换的方块对象
     * @param teris 
     */
    swtich(teris: SquareGroup): void
}