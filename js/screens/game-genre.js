import {getElemFromTemplate, renderElement, getRandomNumber, getOptions, getTitleGenre} from '../utils';
import gameArtistScreen from './game-artist';
import resultScreen from './result';
import {level, tracks} from '../data/data';
import timerTempl from './parts/timer-templ';

export default (initialState, newOptionState) => {
    const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

    const gameGenreTemplate = (levelState) =>
        `<section class="main main--level main--level-genre">

        ${timerTempl()}
        
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

    form.addEventListener('submit', (e) => {

        e.preventDefault();
        form.reset();
        answerButton.disabled = true;

        if (initialState.mistakes < 2) {

            renderElement(resultScreen(Object.assign({}, initialState, {
                level: 'failTries'
            })));
        } else {

            if (initialState.screensNumber > 1) {

                renderElement(gameArtistScreen(Object.assign({}, initialState, {
                    level: level[initialState.level].next,
                    screensNumber: initialState.screensNumber - 1,
                    mistakes: initialState.mistakes - 1
                }),
                    Object.assign({}, level[level[initialState.level].next], {
                        options: getOptions(3, tracks),
                        answer: {id: getRandomNumber(0, 3)}
                    })
                ));

            } else {

                if (initialState.mistakes > 0 && initialState.time > 0) {

                    renderElement(resultScreen(Object.assign({}, initialState, {
                        level: 'success'
                    })));
                }
            }
        }
    });

    for (let answer of answerList) {

        answer.addEventListener('change', () => {

            if (answer.checked) {

                answerButton.disabled = false;
            } else {

                let checkedCount = 0;
                const list = gameGenreScreen.querySelectorAll('input[name=answer]');

                for (let item of list) {

                    if (item.checked) checkedCount++;
                }
                if (checkedCount == 0) answerButton.disabled = true;
            }
        });
    }

    return gameGenreScreen;
}