import {renderViewElement} from '../utils';
import WellcomeView from '../view/wellcome-view';
import App from '../app';

class Wellcome {
    constructor(state) {
        this.state = state;
        this.view = new WellcomeView();
    }

    init() {
        renderViewElement(this.view);

        this.view.onStart = () => App.showGame();
    }
}

export default new Wellcome;