import {
  fetchNotificationRequest,
  readAllNotificationsRequest,
  readNotificationRequest,
} from "../../services/NotificationService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { getState }) => {
    const currentNotifications = getState().notification;
    const [last] = currentNotifications.slice(-1);
    const lastUpdate = last ? last.date : new Date(0).toISOString();
    return await fetchNotificationRequest(lastUpdate);
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    markNotificationRead: (state, action) => {
      return state.filter(
        (notification) => notification._id !== action.payload
      );
    },
    clearNotifications: (state) => {
      return [];
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { markNotificationRead, clearNotifications } =
  notificationSlice.actions;

export const readNotification = (notification) => async (dispatch) => {
  try {
    await readNotificationRequest(notification);
    dispatch(markNotificationRead(notification));
  } catch (e) {
    console.log(e.message); //TODO
  }
};

export const readAllNotifications = () => async (dispatch) => {
  try {
    await readAllNotificationsRequest();
    dispatch(clearNotifications());
  } catch (e) {
    console.log(e.message); //TODO
  }
};

export default notificationSlice.reducer;
