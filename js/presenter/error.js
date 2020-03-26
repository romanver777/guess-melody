import {renderViewElement} from '../utils';
import ErrorView from '../view/error-view';
import App from '../app';

export default class Error {
    constructor(error) {
        this.error = error;
        this.view = new ErrorView(this.error);
    }

    init() {
        renderViewElement(this.view);

        this.view.reStart = () => App.start();
    }
}