import {getElemFromTemplate} from '../utils';

export default class AbstractView {

    constructor (state, level) {

        this.state = state;
        this.level = level;
    }

    get template() {

        throw new Error('You have to define template for view');
    }

    render() {

        return getElemFromTemplate(this.template);
    }

    bind() {}

    get element() {

        if (!this._element) {

            this._element = this.render();
            this.bind();
        }

        return this._element;
    }
}