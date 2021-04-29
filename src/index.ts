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

const sq2 = new Square()
sq2.color = 'red'
sq2.point = {
    x: 4,
    y: 0
}
sq2.viewer = new SquarePageViewer(sq2, $('#root'))

$('#down').on('click', () => {
    console.log(sq.viewer)
    sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
    }

    sq2.point = {
        x: sq2.point.x,
        y: sq2.point.y + 1
    }

})

$('#remove').on('click', () => {
    sq.viewer && sq.viewer.remove()
})