import {getElemFromTemplate, renderElement} from '../utils';
import welcomeScreen from './wellcome';
import {level} from '../data/data';

const failTimeTemplate = (state) =>
    `<section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

        <h2 class="title">${state.title}</h2>
        <div class="main-stat">${state.stat}</div>
        <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;

const failTimeScreen = getElemFromTemplate(failTimeTemplate( level.result.failTime ));
const replayButton = failTimeScreen.querySelector('.main-replay');

replayButton.addEventListener('click', () => renderElement(welcomeScreen));

export default failTimeScreen;