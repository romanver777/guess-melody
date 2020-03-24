import {renderViewElement} from '../utils';
import ResultView from '../view/result-view';
import App from '../app';

export default class Result {

    constructor(model){
        this.model = model;
        this.view = new ResultView(this.model);
    }

    init() {

        renderViewElement(this.view);

        this.view.onStart = () => App.showWellcome();

    }
}