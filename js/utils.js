
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