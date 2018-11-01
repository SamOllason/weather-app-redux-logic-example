import * as types from './types';

// These are action creators. They are simply wrappers around actions
// that make it neater for components to dispatch actions. Instead
// of the component having to use a dispatch method and include the action
// themselves they can simple call one of these action creators
// which will be passed as a callback function.

export const incrementNumberOfRequestsMade = () => ({
    type: types.INCREMENT_NUMBER_OF_REQUESTS_MADE
});

export const getWeatherData = (city) => ({
    type: types.GET_WEATHER_FOR_CITY,
    payload: city
});