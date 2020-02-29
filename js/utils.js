
export const getElemFromTemplate = (template) => {

    const div = document.createElement('div');

    div.innerHTML = template;

    return div.children[0];
};

const app = document.querySelector('.app .main');

export const renderElement = (elem) => {

    app.innerHTML = '';
    app.appendChild(elem);
};
