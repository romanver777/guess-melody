import {getElemFromTemplate, renderElement} from '../utils';
import resultSuccessScreen from './result-success';
import failTimeScreen from './fail-time';
import failTriesScreen from './fail-tries';
import {initialState, level} from '../data/data';

const timeline =
    `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>`;

const timer =
    `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
    </div>`;

const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

const gameGenreTemplate = (state) =>

    `<section class="main main--level main--level-genre">

        ${timer}     
        ${timeline} 
        
    <div class="main-mistakes">
        ${new Array(initialState.mistakes)
            .fill(mistake)
        .join('')}
    </div>

    <div class="main-wrap">
      <h2 class="title">${state.title}</h2>
      <form class="genre">
        
        ${ state.answers.map( (answer) =>

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
                <input type="checkbox" name="answer" value="answer-${answer.id}" id="a-${answer.id}">
                <label class="genre-answer-check" for="a-${answer.id}"></label>
            </div>`
        ).join('')}
        
        <button class="genre-answer-send" type="submit" disabled>Ответить</button>
      </form>
    </div>
  </section>`;

const gameGenreScreen = getElemFromTemplate(gameGenreTemplate( level.genre ));
const form = gameGenreScreen.querySelector('.genre');
const answerButton = gameGenreScreen.querySelector('.genre-answer-send');
const answerList = gameGenreScreen.querySelectorAll('input[name=answer]');

form.addEventListener('submit', () => {

    let number = Math.floor(Math.random() * 11);

    form.reset();
    answerButton.disabled = true;

    if(number < 4) {

        renderElement(resultSuccessScreen);
    }
    else if(number > 3 && number < 8) {

        renderElement(failTriesScreen);
    }
    else {

        renderElement(failTimeScreen);
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

export default gameGenreScreen;