import { combineReducers } from 'redux';
import weatherDataHandling from './weatherDataHandling';
import requestLogging from './requestLogging';

const rootReducer = combineReducers({
    weatherDataHandling,
    requestLogging
});

export default rootReducer;
