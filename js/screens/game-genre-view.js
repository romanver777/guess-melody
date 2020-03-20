import AbstractView from './abstract-view';
import {getTitleGenre} from '../utils';
import {testMod} from '../data/settings';

const mistake = (mistakes) => {

    if (mistakes) {

        return (
            `<div class="main-mistakes">
                ${new Array(mistakes)
                .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
                .join('')}
             </div>`);
    }
};

export default class GameGenreView extends AbstractView {

    constructor (state, level) {
        super(state, level);
    }

    get template() {

        return (
            `<section class="main main--level main--level-genre">

                ${mistake(this.state.mistakes)}
        
                <div class="main-wrap">
                  <h2 class="title">${getTitleGenre(this.level.title, this.level.answer.genre)}</h2>
                  <form class="genre">
                    
                    ${ this.level.options.map((option) =>
        
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
        const answerList = this.element.querySelectorAll('input[name=answer]');

        let checkedElemsArr = [];

        for (let answer of answerList) {

            answer.addEventListener('change', () => {

                this.onChangeAnswers(answer, answerButton, checkedElemsArr);

                if(checkedElemsArr.length) {

                    answerButton.disabled = false;
                } else {

                    answerButton.disabled = true;
                }
            });
        }

        form.onsubmit = (evt) => {

            evt.preventDefault();

            form.reset();
            answerButton.disabled = true;

            this.onSubmitAnswers();
        }
    }

    onChangeAnswers() {}

    onSubmitAnswers() {}
}