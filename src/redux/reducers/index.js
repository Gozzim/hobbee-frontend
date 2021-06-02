import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";

export default combineReducers({
    user,
    entities,
});
