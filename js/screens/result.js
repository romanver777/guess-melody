import {renderViewElement, getResultStatString} from '../utils';
import welcome from './wellcome';
import {initialState, level} from '../data/data';
import ResultView from './result-view';

const changeLevel = (newMainState) => {

    const statStr = level[newMainState.level].stat;
    const remainingTime = newMainState.time;

    const newLevelState = Object.assign({}, level[newMainState.level], {
        stat: getResultStatString(statStr,
            ['score', 'mistake', 'time'],
            [newMainState.score, initialState.mistakes - newMainState.mistakes, remainingTime])
    });

    const result = new ResultView(newMainState, newLevelState);

    result.onStart = () => renderViewElement(welcome());

    return result;
};

export default (newState) => changeLevel(newState);