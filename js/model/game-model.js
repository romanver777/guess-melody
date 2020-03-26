import {initialState, level} from '../data/data';
import {getOptions, getRandomNumber, getArrayAnswerGenre, getResultStatString} from '../utils';

const getLevel = (state, num) => state.question[num];

const quest = (tracks) => {

    let arr = new Set();

    for(let i = 0; i < initialState.screensNumber; i++) {

        !(i % 2) ? arr.add(artistLevel(tracks))
                 : arr.add(genreLevel(tracks))
    }
    return [...arr];
};

const artistLevel = (tracks) => {

    const numberTracks = 3;

    return {
        title: level.artist.title,
        options: getOptions(numberTracks, tracks),
        answer: {id: getRandomNumber(0, numberTracks)}
    }
};

const genreLevel = (tracks) => {

    const numberTracks = 4;

    let tracksOption = getOptions(numberTracks, tracks);
    let trackGenreArr = tracks[getRandomNumber(0, numberTracks)].genre;
    let genreAnswer = trackGenreArr[getRandomNumber(0, trackGenreArr.length)];

    return {
        title: level.genre.title,
        options: tracksOption,
        answer: {
            genre: genreAnswer,
            id: getArrayAnswerGenre(tracksOption, genreAnswer)
        }
    }
};

export default class GameModel {

    constructor(dataTracks) {
        this.tracks = dataTracks;
        this.restart();
    }

    get state() {

        return this._state;
    }

    hasNextLevel() {

        return getLevel(this._state, this._state.level + 1);
    }

    nextLevel() {

        this._state = Object.assign({}, this._state, {
            level: this._state.level + 1
        });
    }

    currentLevel() {

        return getLevel(this._state, this._state.level);
    }

    setLives() {

        this._state = Object.assign({}, this._state, {
            mistakes: this._state.mistakes - 1
        });
    }

    setTime(time) {

        this._state = Object.assign({}, this._state, {
            time: time
        });
    }

    setFastAnswerTime(startTime, stopTime) {

        let remainingTime = (stopTime - startTime) / 1000;
        let highScoreSeconds = this._state.fastTimeSeconds;

        if (remainingTime < highScoreSeconds) {

            this._state = Object.assign({}, this._state, {
                fastAnswers: this._state.fastAnswers + 1
            });
        }
    }

    setScreensNumber() {

        this._state = Object.assign({}, this._state, {
            screensNumber: this._state.screensNumber - 1
        });
    }

    setStat(statStr) {

        const mistakes = initialState.mistakes - this._state.mistakes;
        const levelsDone = initialState.screensNumber - this._state.screensNumber;
        const fastAnswers = this._state.fastAnswers;
        const remainingTime = this._state.time;
        const score = levelsDone + fastAnswers - mistakes;

        return getResultStatString(statStr,
                ['score', 'mistake', 'time'],
                [score, mistakes, remainingTime])
    }

    resultLevel(name) {

        if (name == 'success') {

            return Object.assign({}, level[name], {
                stat: this.setStat(level[name].stat)
            });
        } else {

            return level[name];
        }
    }
    restart() {
        this._state = Object.assign({}, initialState, {
            question: quest(this.tracks)
        });
    }
}