
export const initialState = Object.freeze({
    mistakes: 3,
    time: 5
});

export const level = Object.freeze({
    welcome: {
        title: 'Правила игры',
        description: 'Правила просты&nbsp;— за&nbsp;5 минут ответить<br>на все вопросы. Ошибиться можно 3 раза.<br>Удачи!'
    },
    artist: {
        title: 'Кто исполняет эту песню?',
        answers: [
            {
                id: 1,
                title: 'Пелагея',
                imgSrc: 'http://placehold.it/134x134'
            },
            {
                id: 2,
                title: 'Краснознаменная дивизия имени моей бабушки',
                imgSrc: 'http://placehold.it/134x134'
            },
            {
                id: 3,
                title: 'Lorde',
                imgSrc: 'http://placehold.it/134x134'
            }
        ]
    },
    genre: {
        title: 'Выберите инди-рок треки',
        answers: [
            {
                id: 0,
                trackSrc: ''
            },
            {
                id: 1,
                trackSrc: ''
            },
            {
                id: 2,
                trackSrc: ''
            },
            {
                id: 3,
                trackSrc: ''
            }
        ]
    },
    result: {
        success: {
            title: 'Вы настоящий меломан!',
            stat: 'За 3 минуты и 25 секунд<br>вы набрали 12 баллов (8 быстрых)<br>совершив 3 ошибки',
            comparison: 'Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков'
        },
        failTime: {
            title: 'Увы и ах!',
            stat: 'Время вышло!<br>Вы не успели отгадать все<br> мелодии',
            comparison: ''
        },
        failTries: {
            title: 'Какая жалость!',
            stat: 'У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!',
            comparison: ''
        }
    }
});