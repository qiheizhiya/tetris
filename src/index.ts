import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import SquareGroup from "./core/SquareGroup";
import { createTeris } from './core/Teris'
import $ from 'jquery'

const sqGroup = createTeris({ x: 3, y: 4 })

sqGroup.squares.forEach(it => {
    it.viewer = new SquarePageViewer(it, $('#root'))
})
console.log(sqGroup)
$('#down').on('click', () => {
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x,
        y: sqGroup.centerPoint.y + 1
    }
})