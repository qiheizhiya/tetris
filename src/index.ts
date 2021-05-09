import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { TerisRule } from './core/TerisRule'
import { createTeris, TShape } from './core/Teris'
import $ from 'jquery'
import { Direction } from "./core/types";

const teris = createTeris({ x: 3, y: 4 })

teris.squares.forEach(it => {
    it.viewer = new SquarePageViewer(it, $('#root'))
})
$('#down').on('click', () => {
    TerisRule.move(teris, Direction.down)
})

$('#right').on('click', () => {
    TerisRule.move(teris, Direction.right)
})

$('#left').on('click', () => {
    TerisRule.move(teris, { x: teris.centerPoint.x - 1, y: teris.centerPoint.y })
})

$('#rotate').on('click', () => {
    TerisRule.rotate(teris)
})