import {getElemFromTemplate, renderElement} from '../utils';
import welcomeScreen from './wellcome';
import {level} from '../data/data';

const resultSuccessTemplate = (state) =>
    `<section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <h2 class="title">${state.title}</h2>
        <div class="main-stat">${state.stat}</div>
        <span class="main-comparison">${state.comparison}</span>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;

const resultSuccessScreen = getElemFromTemplate(resultSuccessTemplate( level.result.success));
const replayButton = resultSuccessScreen.querySelector('.main-replay');

replayButton.addEventListener('click', () => renderElement(welcomeScreen));

export default resultSuccessScreen;