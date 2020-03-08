import  {dictionary} from './data/data';

export const getElemFromTemplate = (template) => {

    const div = document.createElement('div');

    div.innerHTML = template;

    return div.children[0];
};

const app = document.querySelector('.app .main');

export const renderElement = (elem) => {

    app.innerHTML = '';
    app.appendChild(elem);
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
        arr[arr.indexOf(markArr[i])] = +insertStrArr[i] + ' ' + str;
    }

    return arr.join(' ');
};