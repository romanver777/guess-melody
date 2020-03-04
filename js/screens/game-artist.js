import {getElemFromTemplate, renderElement} from '../utils';
import gameGenreScreen from './game-genre';
import {initialState, level} from '../data/data';
import timerTempl from './parts/timer-templ';

export default () => {
    const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

    const gameArtistTemplate = (state) =>
        `<section class="main main--level main--level-artist">
        
        ${timerTempl()}
      
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
            ${ state.options.map((option) =>

            `<div class="main-answer-wrapper">
                    <input class="main-answer-r" type="radio" id="answer-${option.id}" name="answer" value="val-${option.id}"/>
                    <label class="main-answer" for="answer-${option.id}">
                        <img class="main-answer-preview" src=${option.src} alt=${option.title} width="134" height="134">
                        ${option.title}
                    </label>
                </div>`).join('') }
          </form>
        </div>
    </section>`;

    const gameArtistScreen = getElemFromTemplate(gameArtistTemplate(level.artist));
    const answers = gameArtistScreen.querySelectorAll('.main-answer-preview');

    for (let answer of answers) {

        answer.addEventListener('click', () => renderElement( gameGenreScreen() ));
    }

    return gameArtistScreen;
}