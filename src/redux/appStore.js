import { createStore } from "redux";
import rootReducer from "./reducers";

// The store is where application state is held.
// The store also allows state to be updated when users
// dispatch actions.

export default createStore(rootReducer);
