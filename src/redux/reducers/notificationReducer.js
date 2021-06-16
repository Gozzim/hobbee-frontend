import { getUserNotifications } from "../../services/NotificationService";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const defaultState = {
    notifications: [],
    error: null,
}

export const fetchNotifications = createAsyncThunk('users/fetchUsers', () => async dispatch => {
    dispatch(getUserNotifications());
});

const notificationSlice = createSlice({
    name: 'notification',
    defaultState,
    reducers: {
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.notifications = action.data;
            state.error = false;
        },
        [fetchNotifications.rejected]: (state, action) => {
            state.notifications = action.data;
            state.error = true;
        },
    }
});

export default notificationSlice.reducer;