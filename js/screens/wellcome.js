import {getElemFromTemplate, renderElement, getRandomNumber, getOptions} from '../utils';
import gameArtistScreen from './game-artist';
import {level, tracks} from '../data/data';

export default (initialState) => {
    const welcomeTemplate = (levelState) =>
        `<section class="main main--welcome">
        <section class="logo" title="Угадай мелодию">
            <h1>Угадай мелодию</h1>
        </section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">${levelState.title}</h2>
        <p class="text main-text">${levelState.description}</p>
     </section>`;

    const welcomeScreen = getElemFromTemplate(welcomeTemplate(level[initialState.level]));
    const playButton = welcomeScreen.querySelector('.main-play');

    playButton.addEventListener('click', () => {

            renderElement(gameArtistScreen(
                Object.assign({}, initialState, {
                    level: level[initialState.level].next
                }),
                Object.assign({}, level[level[initialState.level].next], {
                    options: getOptions(3, tracks),
                    answer: {id: getRandomNumber(0, 3)}
                })
            ));
    });

    return welcomeScreen;
}