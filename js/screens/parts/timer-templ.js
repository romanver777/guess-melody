
export default (initialStateTime) => {

    const getTime = (min, sec = 0) => {

        if (min < 10) min = `0${min}`;
        if (sec == 60) sec = '00';
        if (sec < 10) sec = `0${sec}`;

        return {min, sec}
    };


    const timerTemplate = (time) => `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
                        <circle cx="390" cy="390" r="370" class="timer-line" style="filter: url(../#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
                      </svg>
                      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
                          <span class="timer-value-mins">${getTime(time).min}</span><!--
                       --><span class="timer-value-dots">:</span><!--
                       --><span class="timer-value-secs">${getTime(time).sec}</span>
                      </div>`;

    return timerTemplate(initialStateTime);
}