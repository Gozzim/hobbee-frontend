import userReducer from "./userReducer";
import { entities } from "./entitiesReducer";
import tagsReducer from "./tagsReducer";

// TODO: refactor reducer function names

export const rootReducer = {
  user: userReducer,
  tags: tagsReducer,
  entities: entities,
};
