import { fetchNotificationRequest } from "../../services/NotificationService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { getState }) => {
    const currentNotifications = getState().notification;
    const [last] = currentNotifications.slice(-1);
    const lastUpdate = last ? last.date : new Date(0).toISOString();
    const result = await fetchNotificationRequest(lastUpdate);
    return result;
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export default notificationSlice.reducer;
