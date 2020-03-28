import Wellcome from './presenter/wellcome';
import Game from './presenter/game';
import Result from './presenter/result';
import Error from './presenter/error';
import Preloader from './presenter/preloader';
import GameModel from './model/game-model';

let dataTracks;

const checkStatus = (response) => {

    if (response.status >= 200 && response.status <= 300) {

       return response;
    } else {

        throw new Error(`${response.status}: ${response.statusText}`);
    }
};

export default class App {

    static start() {
        const preloader = new Preloader();
        preloader.init();

        window.fetch("http://www.mocky.io/v2/5e7dd23b300000dd134af70f")
            .then(checkStatus)
            .then((response) => response.json())
            .then((data) => dataTracks = data)
            .then(() => preloader.stop())
            .then((response) => setTimeout(() => App.showWellcome(), 10))
            .catch( App.showError);
    }

    static showWellcome() {
        const wellcome = new Wellcome();
        wellcome.init();
    }

    static showGame() {
        const game = new Game( new GameModel(dataTracks) );
        game.init();
    }

    static showStats(model) {
        const result = new Result(model);
        result.init();
    }

    static showError(error) {
        const err = new Error(error);
        err.init();
    }
}