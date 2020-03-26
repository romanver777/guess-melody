import {renderViewElement} from '../utils';
import PreloaderView from '../view/preloader-view';

export default class Preloader {

    constructor() {
        this.view = new PreloaderView();
    }

    init() {

        renderViewElement(this.view);

        this.view.start();
    }

    stop() {

        this.view.stop();
    }
}