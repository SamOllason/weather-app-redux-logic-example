import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from "./reducers";
import { createLogicMiddleware } from 'redux-logic';
import rootLogic from './logic/';
import axios from 'axios';

// Dependencies for logic
const deps = {
    httpClient: axios
};

// Create middleware
const logicMiddleware    = createLogicMiddleware(rootLogic, deps);

// Prepare middleware to ensure Redux can use it
const composedMiddleware = compose(applyMiddleware(logicMiddleware));

// Store is where application state is held.
// Create store with reducers and our logic
export default createStore(rootReducer,composedMiddleware);


// NOTE:
// If we were using without redux-logic we would only need this line:
// export default createStore(rootReducer);
