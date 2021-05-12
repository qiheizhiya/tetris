import { Game } from "./core/Game";
import { GamePageViewer } from './core/viewer/GamePageViewer'
import $ from 'jquery'
const game = new Game(new GamePageViewer())

game.start()

$('#start').on('click', () => {
    game.start()
})

$('#pause').on('click', () => {
    game.pause()
})

$('.left').on('click', () => {
    game.control_left()
})

$('.right').on('click', () => {
    game.control_right()
})

$('.bottom').on('click', () => {
    game.control_down()
})