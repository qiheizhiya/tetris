import Square from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const sq = new Square()
sq.color = 'red'
sq.point = {
    x: 3,
    y: 0
}
sq.viewer = new SquarePageViewer(sq, $('#root'))



$('#down').on('click', () => {
    console.log(sq.viewer)
    sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
    }
})

$('#remove').on('click', () => {
    sq.viewer && sq.viewer.remove()
})