import AbstractView from './abstract-view';
import {getTitleGenre} from '../utils';
import {initPlayer} from '../player';
import {testMod} from '../data/settings';

const mistake = (mistakes) => {

    if (mistakes) {

        return (
            `<div class="main-mistakes">
                ${new Array(3 - mistakes)
                    .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
                    .join('')}
                ${new Array(mistakes)
                    .fill(`<img class="main-mistake" src="img/icon-note-active.png" width="35" height="49">`)
                    .join('')}
             </div>`);
    }
};

export default class GameGenreView extends AbstractView {

    constructor (model) {
        super();
        this.level = model.state.question[model.state.level];
        this.mistakes = model.state.mistakes;
    }

    get template() {

        return (
            `<section class="main main--level main--level-genre">

                ${mistake(this.mistakes)}
        
                <div class="main-wrap">
                  <h2 class="title">${getTitleGenre(this.level.title, this.level.answer.genre)}</h2>
                  <form class="genre">
                    
                    ${ this.level.options.map((option) =>
        
                        `<div class="genre-answer">
                            <div class="player-wrapper">
                                <div>
                                    <audio class="player" id="player-${option.id}" src="${option.src}"></audio>
                                    <button class="player-control player-control--play" id="player-control-${option.id}"></button>
                                    <div class="player-track">
                                        <span class="player-status" id="player-status-${option.id}">
                                            <progress value='0' max='100' class='progress-bar' id='progress-bar-${option.id}'></progress>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <input type="checkbox" name="answer" value="answer-${option.id}" id="a-${option.id}">
                            <label class="genre-answer-check" for="a-${option.id}"
                                   ${(testMod && this.level.answer.id.indexOf(option.id) > -1) 
                                           ? 'style="background-color: red"' : null} 
                            ></label>
                        </div>`
                    ).join('')}
                    
                    <button class="genre-answer-send" type="submit" disabled>Ответить</button>
                  </form>
                </div>
            </section>`);
    }

    bind() {

        const form = this.element.querySelector('.genre');
        const answerButton = this.element.querySelector('.genre-answer-send');
        const answerList =[...this.element.querySelectorAll('input[name=answer]')];

        const players = [...this.element.querySelectorAll('.player')];
        const buttons = [...this.element.querySelectorAll('.player-control')];
        const statusList = [...this.element.querySelectorAll('.player-status')];

        let checkedElemsArr = [];

        const getCheckedElemsArr = (evt) => {

            let answer = evt.target;

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
        };

        answerList.forEach((answer) => answer.addEventListener('change', (evt) => getCheckedElemsArr(evt) ) );

        initPlayer(this.element, players, buttons, statusList);

        form.onsubmit = (evt) => {

            evt.preventDefault();

            form.reset();
            answerButton.disabled = true;

            this.onAnswer(checkedElemsArr);
        }
    }

    onAnswer() {}
}