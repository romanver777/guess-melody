import {getElemFromTemplate, renderElement} from '../utils';
import gameArtistScreen from './game-artist';
import {level} from '../data/data';

const welcomeTemplate = (state) =>
    `<section class="main main--welcome">
        <section class="logo" title="Угадай мелодию">
            <h1>Угадай мелодию</h1>
        </section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">${state.title}</h2>
        <p class="text main-text">${state.description}</p>
     </section>`;

const welcomeScreen = getElemFromTemplate(welcomeTemplate(level.welcome));
const playButton = welcomeScreen.querySelector('.main-play');

playButton.addEventListener('click', () => renderElement(gameArtistScreen));

export default welcomeScreen;