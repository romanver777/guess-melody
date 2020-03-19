import {renderViewElement, renderTimerViewElement} from '../utils';
import gameArtist from './game-artist';
import {initialState, level} from '../data/data';
import WellcomeView from './wellcome-view';
import timer from '../screens/parts/timer';


const wellcome = new WellcomeView(initialState, level);

wellcome.onStart = () => {

    const nextlevel = level[initialState.level].next;
    const newState = Object.assign({}, initialState, {
        level: nextlevel,
        screensNumber: initialState.screensNumber
    });

    renderViewElement(gameArtist(newState));
    renderTimerViewElement(timer(newState.time));
};

export default () => wellcome;