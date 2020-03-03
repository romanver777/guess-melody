import {getElemFromTemplate, renderElement} from '../utils';
import gameGenreScreen from './game-genre';
import {initialState, level} from '../data/data';

const timer =
    `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
    </div>`;

const timeline =
    `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center">
      </circle>
    </svg>`;

const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

const gameArtistTemplate = (state) =>
    `<section class="main main--level main--level-artist">
        
        ${timer}
        ${timeline}
      
        <div class="main-mistakes">
            ${ new Array(initialState.mistakes)
                .fill(mistake)
                .join('') }
        </div>
    
        <div class="main-wrap">
          <h2 class="title main-title">${state.title}</h2>
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
            ${ state.answers.map( (answer) =>

                `<div class="main-answer-wrapper">
                    <input class="main-answer-r" type="radio" id="answer-${answer.id}" name="answer" value="val-${answer.id}"/>
                    <label class="main-answer" for="answer-${answer.id}">
                        <img class="main-answer-preview" src=${answer.imgSrc} alt=${answer.title} width="134" height="134">
                        ${answer.title}
                    </label>
                </div>`).join('') }
          </form>
        </div>
    </section>`;

const gameArtistScreen = getElemFromTemplate(gameArtistTemplate( level.artist ));
const answers = gameArtistScreen.querySelectorAll('.main-answer-preview');

for(let answer of answers) {

    answer.addEventListener('click', () => renderElement(gameGenreScreen));
}

export default gameArtistScreen;