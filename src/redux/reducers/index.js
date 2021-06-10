import userReducer from "./userReducer";
import { entities } from "./entitiesReducer";
import {getNotificationAsync} from "./notificationReducer";

// TODO: refactor reducer function names

export const rootReducer = {
  user: userReducer,
  entities: entities,
  getNotificationAsync,
};
