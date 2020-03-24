import wellcome from './presenter/wellcome';
import Game from './presenter/game';
import Result from './presenter/result';
import GameModel from './model/game-model';

export default class App {

    static showWellcome() {
        wellcome.init();
    }

    static showGame() {
        const game = new Game( new GameModel() );
        game.init();
    }

    static showStats(model) {
        const result = new Result(model);
        result.init();
    }

}