import AbstractView from './abstract-view';

export default class ResultView extends AbstractView {

    constructor(level) {

        super();
        this.level = level;
    }

    get template() {

        return (
            `<section class="main main--result">
                <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
                <h2 class="title">${this.level.title}</h2>
                <div class="main-stat">${this.level.stat ? this.level.stat : null}</div>
                <span class="main-comparison">${this.level.comparison}</span>
                <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
            </section>`
        )
    }

    bind() {

        const replayButton = this.element.querySelector('.main-replay');

        replayButton.onclick = () => this.onStart();
    }

    onStart() {}
}