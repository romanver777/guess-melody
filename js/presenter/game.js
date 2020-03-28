import {renderViewElement, renderTimerViewElement, isMistake, tik} from '../utils';
import GameArtistView from '../view/game-artist-view';
import GameGenreView from '../view/game-genre-view';
import TimerView from '../view/parts/timer-view';
import App from '../app';

export default class GamePresenter {
    constructor(model) {
        this.model = model;
        this.state = this.model.state;
        this.view =  new GameArtistView(this.model);
        this._timer = null;
    }

    _tik() {

        let _time = tik(this.model.state.time);

        renderTimerViewElement(new TimerView(_time));
        this.model.setTime(_time);
        this.startGame();
    }

    startGame() {

        renderTimerViewElement(new TimerView(this.model.state.time));

        this._timer = setTimeout(() => {

            if (this.model.state.time > 0) {

                this._tik();

            } else {

                this.stopGame();
                App.showStats(this.model.resultLevel('failTime'));
            }
        }, 1000);
    }

    stopGame() {
        clearInterval(this._timer);
    }


    init() {

        let time = Date.now();
        renderViewElement(this.view);
        this.startGame();

        this.level = this.model.currentLevel();

        this.view.onAnswer = (answer) => {

            this.stopGame();
            this.model.setScreensNumber();

            if (isMistake(answer, this.level)) {

                this.model.setLives();

            } else {

                this.model.setFastAnswerTime(time, Date.now());
            }

            if (this.model.state.mistakes == 0) {

                return App.showStats(this.model.resultLevel('failTries'));
            }

            if (this.model.hasNextLevel()) {

                this.model.nextLevel();

                if (!Array.isArray(answer)) {

                    this.view = new GameGenreView(this.model);

                } else {

                    this.view = new GameArtistView(this.model);

                }
                this.init();

            } else {

                App.showStats(this.model.resultLevel('success'));
            }

        };
    };
}