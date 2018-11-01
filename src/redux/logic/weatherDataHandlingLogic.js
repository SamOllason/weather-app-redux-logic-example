import * as types from '../../actions/types';
import { createLogic } from 'redux-logic';
import axios from 'axios';

const getWeatherDataLogic = createLogic({
    type: types.GET_WEATHER_FOR_CITY,  // Respond to actions of this type
    // cancelType: USER_FETCH_CANCEL, // cancel when this action is dispatched
    latest: true, // only provide the latest response if fired many times

    processOptions: { // options influencing the process hook, default {}
        dispatchReturn: true, // automatically dispatch the actions below from the resolved/rejected promise

        successType: types.GET_WEATHER_FOR_CITY_SUCCESSFUL,
        failType: types.GET_WEATHER_FOR_CITY_FAILURE       // use this action type for errors
    },

    // Here we declare our promise inside a process.
    // When the promise returns one of the actions above will be processed
    process({ action }) {
        console.log('started process with action type: ' + action.type);
        return axios(`api.openweathermap.org/data/2.5/weather?q=London`)
            .then(resp => resp.data);
    }
});

export default [
    ...getWeatherDataLogic
];