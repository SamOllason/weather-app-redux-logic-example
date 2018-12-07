import * as types from '../../actions/types';
import { createLogic } from 'redux-logic';
import axios from 'axios';

// Get your ID here: https://openweathermap.org/appid
const appId = "YOUR_APP_ID_HERE";

const getWeatherDataLogic = createLogic({
    type: types.GET_WEATHER_FOR_CITY,  // Respond to actions of this type
    latest: true, // Only provide the latest response if fired many times

    processOptions: {
        dispatchReturn: true, // Automatically dispatch the actions below from the resolved/rejected promise

        successType: types.GET_WEATHER_FOR_CITY_SUCCESSFUL, // If promise resolved, dispatch this action
        failType: types.GET_WEATHER_FOR_CITY_FAILURE // If promise rejected, dispatch this action
    },

    // Declare our promise inside a process
    process({ action }) {
        console.log('started process with action type: ' + action.type);
        console.log('started process with action payload: ' + action.payload);

        return axios(`https://api.openweathermap.org/data/2.5/weather?q=${action.payload}&APPID=${appId}`)
            .then(resp => resp.data);
    }
});

export default [
    getWeatherDataLogic
];
