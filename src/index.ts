import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import SquareGroup from "./core/SquareGroup";
import $ from 'jquery'

const type = [{x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}]
const sqGroup = new SquareGroup(type, {x: 3, y: 4}, 'red')

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