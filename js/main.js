import welcomeScreen from './screens/wellcome';
import {renderElement} from './utils';
import {initialState} from './data/data';

document.addEventListener('DOMContentLoaded', () => renderElement( welcomeScreen(initialState) ));