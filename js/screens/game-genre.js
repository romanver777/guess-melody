import {getElemFromTemplate, renderElement, getRandomNumber, getOptions, getTitleGenre, getResultStatString, startTimer, stopTimer} from '../utils';
import gameArtistScreen from './game-artist';
import resultScreen from './result';
import {level, tracks} from '../data/data';
import timerTempl from './parts/timer-templ';

export default (initialState, newOptionState) => {
    const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

    const gameGenreTemplate = (levelState) =>
        `<section class="main main--level main--level-genre">

        ${timerTempl(initialState.time)}
        
        <div class="main-mistakes">
            ${new Array(initialState.mistakes)
                .fill(mistake)
                .join('')}
        </div>
        <div class="main-wrap">
          <h2 class="title">${getTitleGenre(levelState.title, levelState.answer.genre)}</h2>
          <form class="genre">
            
            ${ levelState.options.map((option) =>
    
                `<div class="genre-answer">
                    <div class="player-wrapper">
                        <div class="player">
                            <audio></audio>
                            <button class="player-control player-control--play"></button>
                            <div class="player-track">
                                <span class="player-status"></span>
                            </div>
                        </div>
                    </div>
                    <input type="checkbox" name="answer" value="answer-${option.id}" id="a-${option.id}">
                    <label class="genre-answer-check" for="a-${option.id}"></label>
                    ${option.genre}
                </div>`
            ).join('')}
            
            <button class="genre-answer-send" type="submit" disabled>Ответить</button>
          </form>
        </div>
  </section>`;

    const gameGenreScreen = getElemFromTemplate(gameGenreTemplate(newOptionState));
    const form = gameGenreScreen.querySelector('.genre');
    const answerButton = gameGenreScreen.querySelector('.genre-answer-send');
    const answerList = gameGenreScreen.querySelectorAll('input[name=answer]');

    let checkedElemsArr = [];

    const timerELemMin = gameGenreScreen.querySelector('.timer-value-mins');
    const timerElemSec = gameGenreScreen.querySelector('.timer-value-secs');
    const timerLine = gameGenreScreen.querySelector('.timer-line');

    let observer = new MutationObserver(() => {

        if (timerElemSec.innerHTML == '00' && timerELemMin.innerHTML == '00') {

            let timeOut = setTimeout(() => {

                renderElement(resultScreen(Object.assign({}, initialState, {
                    level: 'failTime'
                })));

                observer.disconnect();

                clearTimeout(timeOut);
                stopTimer();

            }, 500);
        }
    });
    observer.observe(timerElemSec, {childList: true});

    let time = Date.now();

    startTimer(initialState.time, timerELemMin, timerElemSec, timerLine);

    form.addEventListener('submit', (e) => {

        time = Math.floor( (Date.now() - time) / 1000 );
        stopTimer();

        let remainingTime = (initialState.time * 60 - time) / 60;

        e.preventDefault();
        form.reset();
        answerButton.disabled = true;

        let mistake = false;
        let genreAnswerArr = newOptionState.answer.id;

        if (checkedElemsArr.length !== genreAnswerArr.length) {

            mistake = true;
            initialState.mistakes--;
        } else {

            for (let checkEl of checkedElemsArr) {

                if (genreAnswerArr.indexOf(checkEl) < 0 ) {

                    mistake = true;
                    initialState.mistakes--;
                }
            }
        }

        if (initialState.mistakes < 1) {

            renderElement(resultScreen(Object.assign({}, initialState, {
                level: 'failTries'
            })));
        } else {

            if (initialState.screensNumber > 1) {

                renderElement(gameArtistScreen(Object.assign({}, initialState, {
                    level: level[initialState.level].next,
                    time: remainingTime,
                    screensNumber: initialState.screensNumber - 1,
                    mistakes: initialState.mistakes,
                    score: (time < 10 && !mistake) ? (initialState.score + 2) : (initialState.score + 1)
                }),
                    Object.assign({}, level[ level[initialState.level].next ], {
                        options: getOptions(3, tracks),
                        answer: {id: getRandomNumber(0, 3)}
                    })
                ));

            } else {

                const statStr =  level.success.stat;

                renderElement(resultScreen(Object.assign({}, initialState, {
                        level: 'success',
                        score: initialState.score,
                        mistakes: initialState.mistakes
                    }),
                    Object.assign({}, level[initialState.level].stat, {
                        stat: getResultStatString(statStr,
                            ['score', 'mistake', 'time'],
                            [initialState.score, 3 - initialState.mistakes, remainingTime])
                    })
                ));
            }
        }
    });

    for (let answer of answerList) {

        answer.addEventListener('change', () => {

            if (answer.checked) {

                checkedElemsArr.push(+answer.id.slice('a-'.length));
            } else {

                for (let i = 0; i < checkedElemsArr.length; i++) {

                    if (checkedElemsArr[i] == +answer.id.slice('a-'.length)) {
                        checkedElemsArr.splice(i, 1);
                    }
                }
            }
            if (checkedElemsArr.length) {

                answerButton.disabled = false;
            } else {

                answerButton.disabled = true;
            }
        });
    }
    return gameGenreScreen;
}