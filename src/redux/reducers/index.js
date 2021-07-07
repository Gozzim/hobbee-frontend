import userReducer from "./userReducer";
import { entities } from "./entitiesReducer";
import tagsReducer from "./tagsReducer";
import notificationReducer from "./notificationReducer";
import { useGroups } from "../../hooks/useGroups";
import groupsReducer from "./groupsReducer";

// TODO: refactor reducer function names

export const rootReducer = {
  user: userReducer,
  tags: tagsReducer,
  entities: entities,
  notification: notificationReducer,
  groups: groupsReducer,
};
