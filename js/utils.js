
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

export const getRandomNumber = (min, max) => {

    let randomNumber = Math.floor(Math.random() * max);

    console.log(randomNumber);
    return randomNumber;

};

const shuffle = (number, arr) => {

    for(let i = arr.length - 1; i > 0; i--){

        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[j];

        arr[j] = arr[i];
        arr[i] = temp;
    }

    return arr.slice(0, number);
};

export const getOptions = (number, tracks) => shuffle(number, tracks);

export const getArrayAnswerGenre = (tracksObj, genreStr) => {

    let arr = [];

    for (let track of tracksObj) {

        if (track.genre == genreStr) {
            arr.push(track.id);
            console.log(' track.genre -',track.genre);
        }
    }
console.log(arr);
    return arr;
};

export const getTitleGenre = (currentSrt, insertStr) => {

    const arr = currentSrt.split(' ');

    arr[1] = insertStr;

    return arr.join(' ');
};