
export const initialState = Object.freeze({
    mistakes: 3,
    time: 5
});

const tracks = [
    {
        id: 0,
        title: 'BORNS',
        src: '../tracks/blue-madonna.mp3',
        imgSrc: '../img/tracks/borns.jpg',
        genre: 'Инди-поп'
    },
    {
        id: 1,
        title: 'The Doors',
        src: '../tracks/blue-sunday.mp3',
        imgSrc: '../img/tracks/thedoors.jpg',
        genre: 'Психоделический рок'
    },
    {
        id: 2,
        title: 'Team Sleep',
        src: '../tracks/delorian.mp3',
        imgSrc: '../img/tracks/team-sleep.jpg',
        genre: 'Дрим-поп'
    },
    {
        id: 3,
        title: '10 FT. Ganja Plant',
        src: '../tracks/fist-of-yuen.mp3',
        imgSrc: '../img/tracks/10ft.jpg',
        genre: 'Рэгги'
    },
    {
        id: 4,
        title: '68',
        src: '../tracks/track5e.mp3',
        imgSrc: '../img/tracks/68.jpg',
        genre: 'Нойз-рок'
    },
    {
        id: 5,
        title: 'Portishead',
        src: '../tracks/nylon-smile.mp3',
        imgSrc: '../img/tracks/portishead.jpg',
        genre: 'Трип-хоп'
    },
    {
        id: 6,
        title: 'Ramona Falls',
        src: '../tracks/boy-ant.mp3',
        imgSrc: '../img/tracks/ramona.jpg',
        genre: 'Инди-рок'
    }
];

export const level = Object.freeze({
    welcome: {
        title: 'Правила игры',
        description: 'Правила просты&nbsp;— за&nbsp;5 минут ответить<br>на все вопросы. Ошибиться можно 3 раза.<br>Удачи!'
    },
    artist: {
        title: 'Кто исполняет эту песню?',
        options: [
            {
                id: 0,
                title: 'BORNS',
                src: 'img/artist/borns.jpg'
            },
            {
                id: 1,
                title: 'The Doors',
                src: 'img/artist/thedoors.jpg'
            },
            {
                id: 2,
                title: 'Team Sleep',
                src: 'img/artist/team-sleep.jpg'
            }
        ],
        answer: {
            id: 2
        }
    },
    genre: {
        title: 'Выберите инди-рок треки',
        options: [
            {
                id: 0,
                src: ''
            },
            {
                id: 1,
                src: ''
            },
            {
                id: 2,
                src: ''
            },
            {
                id: 3,
                src: ''
            }
        ],
        answer: {
            id: [0, 3]
        }
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