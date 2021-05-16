import GamePageViewer from './self/viewer/GamePageViewer';
import Game from "./self/Game";
import $ from 'jquery'
const game = new Game(new GamePageViewer())

game.start()

$(document).on('keydown', (e) => {
    switch (e.which) {
        case 38:
            game.control_rotate()
            return;
        case 39:
            game.control_right()
            return
        case 37:
            game.control_left()
            return
        case 40:
            game.control_down()
        default:
            break;
    }
})