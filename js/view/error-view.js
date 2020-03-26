import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {

    constructor(error) {
        super();
        this.error = error;
    }

    get template() {

        return (
            `<section class="main main--result">
                <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
                <h2 class="title">Что-то пошло не так</h2>
                <div class="main-stat">Попробуйте<br> перезагрузить страницу</div>
                <span class="main-comparison">${this.error}</span>
                <span role="button" tabindex="0" class="main-replay">Перезагрузить</span>
            </section>`)
    }

    bind() {

        const replayButton = this.element.querySelector('.main-replay');

        replayButton.onclick = () => this.reStart();
    }

    reStart() {}
}