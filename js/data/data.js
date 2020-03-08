
export const initialState = Object.freeze({
    level: 'welcome',
    mistakes: 3,
    time: 5,
    screensNumber: 6,
    score: 0
});

export const tracks = [
    {
        id: 0,
        title: 'BORNS',
        src: '../tracks/blue-madonna.mp3',
        imgSrc: '../img/artist/borns.jpg',
        genre: ['инди-поп', 'дрим-поп', 'инди-рок']
    },
    {
        id: 1,
        title: 'The Doors',
        src: '../tracks/blue-sunday.mp3',
        imgSrc: '../img/artist/thedoors.jpg',
        genre: ['психо-рок', 'инди-рок']
    },
    {
        id: 2,
        title: 'Team Sleep',
        src: '../tracks/delorian.mp3',
        imgSrc: '../img/artist/team-sleep.jpg',
        genre: ['дрим-поп', 'трип-хоп']
    },
    {
        id: 3,
        title: '10 FT. Ganja Plant',
        src: '../tracks/fist-of-yuen.mp3',
        imgSrc: '../img/artist/10ft.jpg',
        genre: ['рэгги']
    },
    {
        id: 4,
        title: '68',
        src: '../tracks/track5e.mp3',
        imgSrc: '../img/artist/68.jpg',
        genre: ['нойз-рок']
    },
    {
        id: 5,
        title: 'Portishead',
        src: '../tracks/nylon-smile.mp3',
        imgSrc: '../img/artist/portishead.jpg',
        genre: ['трип-хоп', 'дрим-поп']
    },
    {
        id: 6,
        title: 'Ramona Falls',
        src: '../tracks/boy-ant.mp3',
        imgSrc: '../img/artist/ramona.jpg',
        genre: ['инди-рок']
    }
];

export const level = Object.freeze({
    welcome: {
        title: 'Правила игры',
        description: 'Правила просты&nbsp;— за&nbsp;5 минут ответить<br>на все вопросы. Ошибиться можно 3 раза.<br>Удачи!',
        next: 'artist'
    },
    artist: {
        title: 'Кто исполняет эту песню?',
        options: [
            {
                id: 0,
                title: 'BORNS',
                imgSrc: 'img/artist/borns.jpg'
            },
            {
                id: 1,
                title: 'The Doors',
                imgSrc: 'img/artist/thedoors.jpg'
            },
            {
                id: 2,
                title: 'Team Sleep',
                imgSrc: 'img/artist/team-sleep.jpg'
            }
        ],
        answer: {
            id: 2
        },
        next: 'genre'
    },
    genre: {
        title: 'Выберите треки',
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
            genre: '',
            id: [0, 3]
        },
        next: 'artist'
    },
    success: {
        title: 'Вы настоящий меломан!',
        stat: 'За 3 минуты и 25 секунд<br>вы набрали score совершив<br> mistake',
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

});

export const dictionary = {

    score: ['балл', 'балла', 'баллов'],
    mistake: ['ошибок', 'ошибкy', 'ошибки']
};