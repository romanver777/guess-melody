import {getElemFromTemplate, renderElement} from '../utils';
import welcomeScreen from './wellcome';
import {initialState, level} from '../data/data';

export default (newState, newLevelState) => {
    const resultSuccessTemplate = (levelState) =>
        `<section class="main main--result">
            <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
            <h2 class="title">${levelState.title}</h2>
            <div class="main-stat">${newLevelState ? newLevelState.stat : levelState.stat}</div>
            <span class="main-comparison">${levelState.comparison}</span>
            <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
        </section>`;

    const resultSuccessScreen = getElemFromTemplate(resultSuccessTemplate(level[newState.level]));
    const replayButton = resultSuccessScreen.querySelector('.main-replay');

    replayButton.addEventListener('click', () => renderElement(welcomeScreen(initialState)));

    return resultSuccessScreen;
}