import Wellcome from './presenter/wellcome';
import Game from './presenter/game';
import Result from './presenter/result';
import Error from './presenter/error';
import Preloader from './presenter/preloader';
import GameModel from './model/game-model';

let dataTracks;

const checkStatus = (response) => {

    if (response.status >= 200 && response.status <= 300) {

       return response;
    } else {

        throw new Error(`${response.status}: ${response.statusText}`);
    }
};

export default class App {

    static start() {
        const preloader = new Preloader();
        preloader.init();

        window.fetch("https://downloader.disk.yandex.ru/disk/2773658edfcb3e218eee1d75c1f008b4fd88f4653e731777c2f01e19c9d129b4/5e7ca441/Z6hfHzmyEgG3wEuIdszuonvRKi7QJaxJqZ-azP2SyHE9NkS0ffTaTo2MBK4pXwKbcJMICcb4H2-2GTOBqT13bw%3D%3D?uid=0&filename=guess-melody.json&disposition=attachment&hash=aZJKFS63SX7Pm7hspzXsFVAHO%2BG/CqWFOyfhGsovLS7zSxtfGb/2n35/vTDISjiHq/J6bpmRyOJonT3VoXnDag%3D%3D%3A&limit=0&content_type=text%2Fplain&owner_uid=27872655&fsize=4498&hid=4328f236a28d8f4c36e4e73635a83da2&media_type=text&tknv=v2")
            .then(checkStatus)
            .then((response) => response.json())
            .then((data) => dataTracks = data)
            .then(() => preloader.stop())
            .then((response) => setTimeout(() => App.showWellcome(), 3500))
            .catch( App.showError);
    }

    static showWellcome() {
        const wellcome = new Wellcome();
        wellcome.init();
    }

    static showGame() {
        const game = new Game( new GameModel(dataTracks) );
        game.init();
    }

    static showStats(model) {
        const result = new Result(model);
        result.init();
    }

    static showError(error) {
        const err = new Error(error);
        err.init();
    }
}