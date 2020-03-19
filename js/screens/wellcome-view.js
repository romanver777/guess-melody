import AbstractView from './abstract-view';

export default class WellcomeView extends AbstractView {

    constructor (state, level) {
        super(state);
        this.level = level[state.level];
    }

    get template() {

        return (
        `<section class="main main--welcome">
            <section class="logo" title="Угадай мелодию">
                <h1>Угадай мелодию</h1>
            </section>
            <button class="main-play">Начать игру</button>
            <h2 class="title main-title">${this.level.title}</h2>
            <p class="text main-text">${this.level.description}</p>
        </section>`.trim());
    }

    bind() {

        const button = this.element.querySelector('.main-play');

        button.onclick = (e) => this.onStart();
    }

    onStart() {}
}