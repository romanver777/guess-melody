import {getElemFromTemplate, renderElement, getOptions, getArrayAnswerGenre, getRandomNumber} from '../utils';
import gameGenreScreen from './game-genre';
import resultScreen from './result';
import {level, tracks} from '../data/data';
import timerTempl from './parts/timer-templ';

export default (initialState, newOptionState) => {

    const mistake = (mistakes) => {

        if (mistakes) {

            return `
                <div class="main-mistakes">
                    ${new Array(mistakes)
                    .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
                    .join('')}
                </div>`
        }
    };
    const gameArtistTemplate = (levelState) =>

        `<section class="main main--level main--level-artist">
        
        ${timerTempl(initialState.time)}
        
        ${mistake(initialState.mistakes)}
    
        <div class="main-wrap">
          <h2 class="title main-title">${levelState.title}</h2>
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <form class="main-list">
            ${ levelState.options.map((option) =>

            `<div class="main-answer-wrapper">
                    <input class="main-answer-r" type="radio" id="answer-${option.id}" name="answer" value="val-${option.id}"/>
                    <label class="main-answer" for="answer-${option.id}">
                        <div class="main-answer-img-wrap">
                            <img id="answerImg-${option.id}" class="main-answer-preview" src=${option.imgSrc} alt="${option.title}">
                        </div>
                        ${option.title}
                    </label>
                </div>`).join('') }
          </form>
        </div>
    </section>`;

    const gameArtistScreen = getElemFromTemplate(gameArtistTemplate(newOptionState));
    const answers = gameArtistScreen.querySelectorAll('.main-answer-preview');

    for (let answer of answers) {

        answer.addEventListener('click', (event) => {

            let clickedELemId = event.target.id.slice('answerImg-'.length);
            let answerId = newOptionState.options[newOptionState.answer.id].id;
            let mistake = false;

            if (clickedELemId != answerId) {

                mistake = true;
                initialState.mistakes--;
            }

            if (initialState.mistakes < 1) {

                renderElement(resultScreen(Object.assign({}, initialState, {
                    level: 'failTries'
                })));

            } else {

                if (initialState.screensNumber > 1) {

                    let optionsGenre = getOptions(4, tracks);
                    let answerGenreArr = optionsGenre[getRandomNumber(0, 4)].genre;
                    let genreState = answerGenreArr[getRandomNumber(0, answerGenreArr.length)];

                    renderElement(gameGenreScreen(Object.assign({}, initialState, {
                        level: level[initialState.level].next,
                        screensNumber: initialState.screensNumber - 1,
                        mistakes: initialState.mistakes
                    }),
                        Object.assign({}, level[level[initialState.level].next], {
                            options: optionsGenre,
                            answer: {
                                genre: genreState,
                                id: getArrayAnswerGenre(optionsGenre, genreState)
                            }
                        })

                    ));

                } else {

                    renderElement(resultScreen(Object.assign({}, initialState, {
                        level: 'success'
                    })));
                }
            }
        });
    }

    return gameArtistScreen;
}