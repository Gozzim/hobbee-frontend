import {rootReducer} from "../redux/reducers";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer
});
