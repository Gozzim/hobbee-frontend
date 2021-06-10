import { fetchUserNotifications } from "../../services/NotificationService";

const defaultState = {
    notifications: [],
    error: false
}

export function notificationReducer(state = defaultState, action) {
    state.notifications = action.payload;
    state.error = false;
}

export const getNotificationAsync = () => {
    return async dispatch => {
        const res = await fetchUserNotifications();
        if (res.success) {
            dispatch(notificationReducer(res.request));
        }
    }
}
