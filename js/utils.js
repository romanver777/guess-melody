import  {initialState, dictionary} from './data/data';

export const getElemFromTemplate = (template) => {

    const div = document.createElement('div');

    div.innerHTML = template;

    return div.children[0];
};

const app = document.querySelector('.app .main');

export const renderViewElement = (view) => {

    app.innerHTML = '';
    app.appendChild(view.element);
};

export const renderTimerViewElement = (view) => {

    if (app.querySelector('#timer')) {

        app.querySelector('#timer').remove();
    }
    app.appendChild(view.element);
};

export const getRandomNumber = (min, max) =>  Math.floor(Math.random() * max);

const shuffle = (number, arr) => {

    for(let i = 0; i < arr.length; i++){

        let j = getRandomNumber(i, arr.length);
        let temp = arr[j];

        arr[j] = arr[i];
        arr[i] = temp;
    }

    return arr.slice(0, number);
};

export const getOptions = (number, tracks) => shuffle(number, tracks);

export const isMistake = (data, levelState) => {

    let mistake = false;

    if(!Array.isArray(data)) {

        const {id} = data.target;
        const clickedELemId = id.slice('answerImg-'.length);
        const answerId = levelState.options[levelState.answer.id].id;

        if (clickedELemId != answerId) mistake = true;

    } else {

        if (data.length !== levelState.answer.id.length) {

            mistake = true;
        } else {

            for (let elem of data) {

                if (levelState.answer.id.indexOf(elem) < 0) {

                    mistake = true;
                }
            }
        }
    }
    return mistake;
};

export let getArrayAnswerGenre = (tracksObj, genreStr) => {

    let arr = [];

    for (let track of tracksObj) {

        if (track.genre.indexOf(genreStr) > -1) {

            arr.push(track.id);
        }
    }
    return arr;
};

export const getTitleGenre = (currentStr, insertStr) => {

    const arr = currentStr.split(' ');

    arr.splice(1, 0, insertStr);

    return arr.join(' ');
};

export const getResultStatString = (currentStr, markArr, insertStrArr) => {

    let arr = currentStr.split(' ');

    for (let i = 0; i < markArr.length; i++) {

        let str = '';

        if (markArr[i] == 'score') {

            if (insertStrArr[i] < 2) str = dictionary.score[0];
            if (insertStrArr[i] > 1 && insertStrArr[i] < 5) str = dictionary.score[1];
            if (insertStrArr[i] > 4) str = dictionary.score[2];
        }
        if (markArr[i] == 'mistake') {

            if (insertStrArr[i] < 1) str = dictionary.mistake[0];
            if (insertStrArr[i] > 0 && insertStrArr[i] < 2) str = dictionary.mistake[1];
            if (insertStrArr[i] > 1) str = dictionary.mistake[2];
        }
        if (markArr[i] == 'time') {

            let time = initialState.time - insertStrArr[i];
            let min = getTime(time).minutes;
            let sec = getTime(time).seconds;

            if (min == 0) min = str = '';
            if (min == 1) str = dictionary.min[1];
            if (min > 1) str = dictionary.min[2];
            if (min > 4) str = dictionary.min[0];

            min = min + ' ' + str;

            let secLastNumber = sec.toString().slice(-1);

            if (secLastNumber == 0 || secLastNumber > 4 && secLastNumber <= 9) str = dictionary.sec[0];
            if (secLastNumber == 1) str = dictionary.sec[1];
            if (secLastNumber > 1 && secLastNumber < 5) str = dictionary.sec[2];
            if (sec > 4 && sec < 21) str = dictionary.sec[0];
            if (sec == 0) sec = str = '';

            sec = sec + ' ' + str;

            arr[arr.indexOf(markArr[i])] = `${min} ${sec}`;
        }
        if (i < markArr.length - 1) {
            arr[arr.indexOf(markArr[i])] = +insertStrArr[i] + ' ' + str;
        }
    }

    return arr.join(' ');
};

export const getTime = (min) => {

    let minutes = Math.trunc(min);
    let seconds = Math.round( (min - minutes) * 60 );

    return {minutes, seconds}
};

export const convertTimeToString = (time) => {

    if (time.toString().length < 2) time = `0${time}`;

    return time;
};

export const tik = (time) => {

    let minutes = getTime(time).minutes;
    let seconds = getTime(time).seconds;

    if (seconds == 0)  {

        minutes--;
        seconds = 60;
    }
    if (minutes < 0) {

    } else {

        seconds--;
    }
    return `${(minutes * 60 + seconds) / 60}`;
};