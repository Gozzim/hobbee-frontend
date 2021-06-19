import { combineReducers } from "redux";
import { user } from "./userReducer";
import { entities } from "./entitiesReducer";

// TODO: refactor reducer function names

export const rootReducer = combineReducers({
  user: user,
  entities: entities,
});
