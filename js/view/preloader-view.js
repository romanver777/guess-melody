import AbstractView from './abstract-view';

export default class PreloaderView extends AbstractView {

    constructor() {
        super();
    }

    get template() {

        return (
            `<section class="main main--welcome">
                <section class="logo" title="Угадай мелодию">
                    <h1>Угадай мелодию</h1>
                </section>
                <h2 class="title main-title">Загружаем игру...</h2>
                <p class="text main-text"></p>
                <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
                    <circle cx="390" cy="390" r="315" class="timer-line" style="filter: url(../#blur);  transform-origin: center" stroke-dasharray="200"></circle>
                </svg>
            </section>`)
    }

    start() {

        this.element.classList.add('animate');
    }

    stop() {

        let timeout = setTimeout(() => {

            this.element.classList.add('fadeout');
            clearTimeout(timeout);

        }, 3000);
    }
}