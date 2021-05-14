import createTetris, { ErectShape, LOppositeShape, LShape, SoilShpae, SOppositeShape, SShape, TianShape } from "./self/Shapes";
import SquareGroup from "./self/SquareGroup";
import SquareViewer from "./self/viewer/SquareViewer";
import $ from 'jquery'
import Square from "./self/Square";
const sqGroup = createTetris({ x: 3, y: 3 })

sqGroup.squares.forEach(sq => {
  sq.viewer = new SquareViewer(sq, $("#panel"))
})

$('.bottom').on('click', () => {
  sqGroup.centerPoint = {
    x: sqGroup.centerPoint.x,
    y: sqGroup.centerPoint.y + 1
  }
})