import AbstractView from './abstract-view';
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

export default class GameArtistView extends AbstractView {

    constructor(model) {
        super();
        this.level = model.state.question[model.state.level];
        this.mistakes = model.state.mistakes;
    }
    get template() {

        return (
            `<section class="main main--level main--level-artist">
        
        
            ${mistake(this.mistakes)}
    
            <div class="main-wrap">
                <h2 class="title main-title">${this.level.title}</h2>
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

        const answers = this.element.querySelectorAll('.main-answer-preview');

        for (let answer of answers) {

            answer.onclick = (evt) => this.onAnswer(evt);
        }
    }

    onAnswer() {}
};