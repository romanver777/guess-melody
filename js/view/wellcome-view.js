import AbstractView from './abstract-view';

export default class WellcomeView extends AbstractView {

    get template() {

        return (
        `<section class="main main--welcome">
            <section class="logo" title="Угадай мелодию">
                <h1>Угадай мелодию</h1>
            </section>
            <button class="main-play">Начать игру</button>
            <h2 class="title main-title">Правила игры</h2>
            <p class="text main-text">Правила просты&nbsp;— за&nbsp;5 минут ответить<br>на все вопросы. Ошибиться можно 3 раза.<br>Удачи!</p>
        </section>`.trim());
    }

    bind() {

        const button = this.element.querySelector('.main-play');

        button.onclick = (e) => this.onStart();
    }

    onStart() {}
}