import {rootReducer} from "../redux/reducers";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

// TODO: persistency

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
