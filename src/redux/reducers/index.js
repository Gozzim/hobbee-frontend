import userReducer from "./userReducer";
import { entities } from "./entitiesReducer";

// TODO: refactor reducer function names

export const rootReducer = {
  user: userReducer,
  entities: entities,
};
