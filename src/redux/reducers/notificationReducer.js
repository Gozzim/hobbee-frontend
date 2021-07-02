import {getUserNotifications} from "../../services/NotificationService";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    notifications: {},
    error: false,
}

export const fetchNotifications = createAsyncThunk('data/Notifications', () => async dispatch => {
    dispatch(getUserNotifications());
});

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
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