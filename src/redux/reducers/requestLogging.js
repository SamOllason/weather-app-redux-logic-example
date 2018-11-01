import * as types from '../../actions/types';

const initialState = {
    numberOfRequests: 0,
    weatherSummary: "not selected city"
};

// Use ES6 default parameter to provide argument to arrow function
const requestLogging = (state = initialState, action) => {
    switch (action.type) {

        case types.INCREMENT_NUMBER_OF_REQUESTS_MADE:
            return {
                ...state,
                numberOfRequests: state.numberOfRequests + 1
            };

        default:
            // If action is none of these then just return state - i.e. don't mutate app state!
            return state;
    }
};

export default requestLogging;
