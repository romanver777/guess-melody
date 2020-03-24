// import {renderViewElement, isMistake, getRandomNumber, getOptions, getArrayAnswerGenre} from '../utils';
// import gameArtist from '../game/game';
// import result from './result';
// import {level, tracks} from '../data/data';
// import GameGenreView from './game-genre-view';
// import {stopGame} from './parts/timer';
//
// const changeLevel = (newMainState) => {
//
//     const numberTracks = 4;
//     let answersIdArray = [];
//     let time = Date.now();
//
//     let tracksOption = getOptions(numberTracks, tracks);
//     let trackGenreArr = tracks[getRandomNumber(0, numberTracks)].genre;
//     let genreAnswer = trackGenreArr[getRandomNumber(0, trackGenreArr.length)];
//
//     let newLevelState = Object.assign({}, level[newMainState.level], {
//         options: tracksOption,
//         answer: {
//             genre: genreAnswer,
//             id: getArrayAnswerGenre(tracksOption, genreAnswer)
//         }
//     });
//
//     const genre = new GameGenreView(newMainState, newLevelState);
//
//     genre.onChangeAnswers = (answer, answerButton, checkedElemsArr) => {
//
//         if (answer.checked) {
//
//             checkedElemsArr.push(+answer.id.slice('a-'.length));
//         } else {
//
//             for (let i = 0; i < checkedElemsArr.length; i++) {
//
//                 if (checkedElemsArr[i] == +answer.id.slice('a-'.length)) {
//                     checkedElemsArr.splice(i, 1);
//                 }
//             }
//         }
//         answersIdArray = checkedElemsArr;
//     };
//
//     genre.onSubmitAnswers = (evt) => {
//
//         time = Math.floor((Date.now() - time) / 1000);
//
//         let remainingTime = (newMainState.time * 60 - time) / 60;
//
//         if(isMistake(answersIdArray, newLevelState)) newMainState.mistakes--;
//
//         if (newMainState.mistakes < 1) {
//
//             stopGame();
//             renderViewElement(result(Object.assign({}, newMainState, {
//                 level: 'failTries'
//             })));
//
//         } else {
//
//             if (newMainState.screensNumber > 1) {
//
//                 renderViewElement(gameArtist(Object.assign({}, newMainState, {
//                         level: level[newMainState.level].next,
//                         time: remainingTime,
//                         screensNumber: newMainState.screensNumber - 1,
//                         score: (time < 10) ? (newMainState.score + 2) : (newMainState.score + 1)
//                     })
//                 ));
//             } else {
//
//                 stopGame();
//                 renderViewElement(result(Object.assign({}, newMainState, {
//                         level: 'success',
//                         time: remainingTime
//                     }),
//                 ));
//             }
//         }
//     };
//     return genre;
// };
//
// export default (newState) => changeLevel(newState);