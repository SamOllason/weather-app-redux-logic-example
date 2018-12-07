import * as types from '../../actions/types';
import { createLogic } from 'redux-logic';
import axios from 'axios';

const getWeatherDataLogic = createLogic({
    type: types.GET_WEATHER_FOR_CITY,  // Respond to actions of this type
    latest: true, // Only provide the latest response if fired many times

    processOptions: {
        dispatchReturn: true, // Automatically dispatch the actions below from the resolved/rejected promise

        successType: types.GET_WEATHER_FOR_CITY_SUCCESSFUL, // If promise success, dispatch this action
        failType: types.GET_WEATHER_FOR_CITY_FAILURE // If promise fails, dispatch this action
    },

    // Declare our promise inside a process.
    // When promise returns one of the actions above will be processed
    process({ action }) {
        console.log('started process with action type: ' + action.type);
        console.log('started process with action payload: ' + action.payload);

        return axios(`https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&APPID=b0a33ce7b1e3c397415e4ae403b6a3fd`)
            .then(resp => resp.data);
    }
});

export default [
    getWeatherDataLogic
];
