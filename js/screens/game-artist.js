import {renderViewElement, removeTimerViewElement, renderTimerViewElement, getOptions, isMistake, getRandomNumber} from '../utils';
import gameGenre from './game-genre';
import result from './result';
import {level, tracks} from '../data/data';
import GameArtistView from './game-artist-view';
import {stopGame} from './parts/timer';

const changeLevel = (newMainState) => {

    const numberTracks = 3;
    let time = Date.now();

    let newLevelState = Object.assign({}, level[newMainState.level], {
        options: getOptions(numberTracks, tracks),
        answer: {id: getRandomNumber(0, numberTracks)}
    });

    const artist = new GameArtistView(newMainState, newLevelState);

    artist.onAnswer = (evt) => {

        time = Math.floor((Date.now() - time) / 1000);

        let remainingTime = (newMainState.time * 60 - time) / 60;

        if (isMistake(evt, newLevelState)) newMainState.mistakes--;

        if (newMainState.mistakes < 1) {

            stopGame();
            renderViewElement(result(Object.assign({}, newMainState, {
                level: 'failTries'
            })));

        } else {

            if (newMainState.screensNumber > 1) {

                renderViewElement(gameGenre(Object.assign({}, newMainState, {
                        level: level[newMainState.level].next,
                        time: remainingTime,
                        screensNumber: newMainState.screensNumber - 1,
                        score: (time < 10) ? (newMainState.score + 2) : (newMainState.score + 1)
                    })
                ));

            } else {

                stopGame();
                renderViewElement(result(Object.assign({}, newMainState, {
                        level: 'success',
                        time: remainingTime
                    }),
                ));
            }
        }
    };
    return artist;
};

export default (newState) => changeLevel(newState);