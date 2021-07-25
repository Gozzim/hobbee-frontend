import userReducer from "./userReducer";
import tagsReducer from "./tagsReducer";
import notificationReducer from "./notificationReducer";
import groupsReducer from "./groupsReducer";

export const rootReducer = {
  user: userReducer,
  tags: tagsReducer,
  notification: notificationReducer,
  groups: groupsReducer,
};
