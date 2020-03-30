import AbstractView from './abstract-view';
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

export default class GameArtistView extends AbstractView {

    constructor(model) {
        super();
        this.level = model.state.question[model.state.level];
        this.mistakes = model.state.mistakes;
    }
    get template() {

        const url = this.level.options[this.level.answer.id].src;
        const id = this.level.options[this.level.answer.id].id;

        return (
            `<section class="main main--level main--level-artist">
        
        
            ${mistake(this.mistakes)}
    
            <div class="main-wrap">
                <h2 class="title main-title">${this.level.title}</h2>
                <div class="player-wrapper">
                    <div class="player-field">
                        <audio class="player" src="${url}" id="player-${id}"></audio>
                        <button class="player-control player-control--play" id="player-control-${id}"></button>
                        <div class="player-track">
                        <span class="player-status" id="player-status-${id}">
                            <progress value='0' max='100' class='progress-bar' id="progress-bar-${id}"></progress>
                        </span>
                    </div>
                </div>
            </div>
            <form class="main-list">
            
                ${ this.level.options.map((option, ind) =>

                `<div class="main-answer-wrapper">
                        <input class="main-answer-r" type="radio" id="answer-${option.id}" name="answer" value="val-${option.id}"/>
                        <label class="main-answer" for="answer-${option.id}">
                            <div class="main-answer-img-wrap"
                                ${(testMod && ind == this.level.answer.id) ? 'style="border-color: red"' : null}
                            >
                                <img id="answerImg-${option.id}" class="main-answer-preview" src=${option.imgSrc} alt="${option.title}">
                            </div>
                            ${option.title}
                        </label>
                    </div>`).join('') }
            </form>
        </section>`);
    }

    bind() {

        const answers = [...this.element.querySelectorAll('.main-answer-preview')];
        const players = [...this.element.querySelectorAll('.player')];
        const buttons = [...this.element.querySelectorAll('.player-control')];
        const statusList = [...this.element.querySelectorAll('.player-status')];

        answers.forEach((answer) => answer.addEventListener('click', (evt) => this.onAnswer(evt)) );

        initPlayer(this.element, players, buttons, statusList);
    }

    onAnswer() {}
}