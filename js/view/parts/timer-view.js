import AbstractView from '../abstract-view';
import {convertTimeToString, getTime} from '../../utils';
import {initialState} from '../../data/data';

export default class TimerView extends AbstractView {

    constructor(state) {
        super();
        this.time = state;
    }

    get template() {

        let min = convertTimeToString(getTime(this.time).minutes);
        let sec = convertTimeToString(getTime(this.time).seconds);

        return (
            `<div id="timer">
                <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
                    <span class="timer-value-mins">${min}</span><!--
                 --><span class="timer-value-dots">:</span><!--
                 --><span class="timer-value-secs">${sec}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
                    <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
                </svg>
            </div>`);
    }

    bind() {

        const timerLine = this.element.querySelector('.timer-line');
        const timerValue = this.element.querySelector('.timer-value');

        const radius = timerLine.getAttribute('r');
        const strokeCircleWidth = Math.round(2 * Math.PI * radius);
        const transitionOption = '1s linear';

        let currentLinePos = strokeCircleWidth - (strokeCircleWidth * this.time / initialState.time);

        if ( (this.time * 60) < 6) {
            timerValue.classList.add('timer-value--finished');
        }

        timerLine.style.strokeDasharray = strokeCircleWidth;
        timerLine.style.transition = transitionOption;
        timerLine.style.strokeDashoffset = currentLinePos;

    }

}

