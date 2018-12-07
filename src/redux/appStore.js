import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from "./reducers";
import { createLogicMiddleware } from 'redux-logic';
import rootLogic from './logic/';
import axios from 'axios';

// Dependencies for Logic
const deps = {
    httpClient: axios
};

// Create middleware
const logicMiddleware = createLogicMiddleware(rootLogic, deps);

// Prepare middleware to ensure Redux can use it
const composedMiddleware = compose(applyMiddleware(logicMiddleware));

// Our Redux Store is where application state is held
// Create store with reducers and all our Logic
export default createStore(rootReducer,composedMiddleware);

// NOTE, for information only:
// If we were just using Redux and not using Redux-Logic we would only need this line:
// export default createStore(rootReducer);
