import userReducer from "./userReducer";
import { entities } from "./entitiesReducer";
import notificationReducer from "./notificationReducer";

// TODO: refactor reducer function names

export const rootReducer = {
  user: userReducer,
  entities: entities,
  notification: notificationReducer,
};
