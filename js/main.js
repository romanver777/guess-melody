
const mainPage = [
    ...document.querySelector('#templates').content.querySelectorAll('.main')
];
// console.log(mainPage);

const app = document.querySelector('.app');
const appMain = app.querySelector('.main');
const arrows = `<div class="arrows__wrap">
                    <style>
                      .arrows__wrap {
                        position: absolute;
                        top: 135px;
                        left: 50%;
                        margin-left: -56px;
                      }
                      .arrows__btn {
                        background: none;
                        border: 2px solid black;
                        padding: 5px 20px;
                        cursor: pointer;
                      }
                    </style>
                    <button class="arrows__btn"><</button>
                    <button class="arrows__btn">></button>
                </div>`;

let currentActivePageIndex = 0;

const appendTemplateElement = (index) => {

    appMain.innerHTML = '';
    appMain.appendChild(mainPage[index]).cloneNode(true);
};

const createNextPage = () => {

    ++currentActivePageIndex;

    if(currentActivePageIndex < mainPage.length) {

        appendTemplateElement(currentActivePageIndex);

    } else {

        --currentActivePageIndex;
    }
};

const createPreviousPage = () => {

    --currentActivePageIndex;

    if(currentActivePageIndex >= 0) {

        appendTemplateElement(currentActivePageIndex);

    } else {

        ++currentActivePageIndex;
    }
};

const onKeyupHandler = (el) => {

    const {keyCode} = el;

    switch (keyCode) {

        case 39:
            createNextPage();
            break;
        case 37:
            createPreviousPage();
            break;
    }
};

app.insertAdjacentHTML('beforeEnd', arrows);

const arrowButtons = document.querySelectorAll('.arrows__btn');

arrowButtons[0].addEventListener('click', createPreviousPage);
arrowButtons[1].addEventListener('click', createNextPage);

document.addEventListener('keyup', onKeyupHandler);

appendTemplateElement(currentActivePageIndex);
