import {renderViewElement, renderTimerViewElement, tik} from '../../utils';
import TimerView from './timer-view';
import result from '../../presenter/result';
import {initialState} from '../../data/data';

let timeout;

const gameStart = (time) => {

    timeout = setTimeout(() => {

        if (time > 0) {

            renderTimerViewElement(changeLevel(tik(time)));
        } else {

            clearTimeout(timeout);
            renderViewElement(result(Object.assign({}, initialState, {
                level: 'failTime'
            })));
        }
    }, 1000);
};

const changeLevel = (state) => {

    gameStart(state);

    return new TimerView(state, timeout);
};

export const stopGame = () => clearTimeout(timeout);

export default (newState) => changeLevel(newState);