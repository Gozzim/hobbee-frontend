import {
  fetchNotificationRequest,
  readAllNotificationsRequest,
  readNotificationRequest,
} from "../../services/NotificationService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationsReducer: (state, action) => {
      return action.payload;
    },
    markNotificationRead: (state, action) => {
      return state.filter(
        (notification) => notification._id !== action.payload
      );
    },
    clearNotifications: (state) => {
      return [];
    },
  },
});

export const { notificationsReducer, markNotificationRead, clearNotifications } =
  notificationSlice.actions;

export const fetchNotifications = () => async (dispatch) => {
  try {
    const resp = await fetchNotificationRequest();
    dispatch(notificationsReducer(resp));
  } catch (e) {
    console.log(e.message);
  }
};

export const readNotification = (notification) => async (dispatch) => {
  try {
    await readNotificationRequest(notification);
    dispatch(markNotificationRead(notification));
  } catch (e) {
    console.log(e.message);
  }
};

export const readAllNotifications = () => async (dispatch) => {
  try {
    await readAllNotificationsRequest();
    dispatch(clearNotifications());
  } catch (e) {
    console.log(e.message);
  }
};

export default notificationSlice.reducer;
