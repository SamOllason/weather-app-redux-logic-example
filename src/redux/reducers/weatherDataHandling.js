import * as types from '../../actions/types';

const initialState = {
    isFetching: false,
    weatherSummary: "no weather data fetched yet"
};

const weatherDataHandling = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_WEATHER_FOR_CITY:
            return {
                ...state,
                isFetching: true
            };

        case types.GET_WEATHER_FOR_CITY_SUCCESSFUL:

            console.log({
                action_payload: action.payload
            });

            return {
                ...state,
                isFetching: false,
                weatherSummary: action.payload.weather[0].description,
            };

        case types.GET_WEATHER_FOR_CITY_FAILURE:
            return {
                ...state,
                weatherSummary: "Failure fetching weather data",
                isFetching: false
            };

        default:
            // If action is none of these then just return state - i.e. don't mutate app state!
            return state;
    }
};

export default weatherDataHandling;
