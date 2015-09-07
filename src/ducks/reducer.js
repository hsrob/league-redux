import { combineReducers } from 'redux';

import auth from './auth';
import counter from './counter';
import champions from './champions';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';

export default combineReducers({
    auth,
    counter,
    champions,
    form,
    info,
    widgets
});
