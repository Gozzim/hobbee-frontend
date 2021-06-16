import axios from "axios";
import {logout} from "../redux/actions";

// Handling requests before they are sent
axios.interceptors.request.use(
    async (request) => {
        // Before request is sent
        const token = getToken();
        if (token) {
            axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
        }
        return request;
    },
    (error) => {
        // Error handling
        return Promise.reject(error);
    }
);

// Handling received requests
axios.interceptors.response.use(
    (resp) => {
        // Handling status codes 2xx
        return resp;
    },
    (error) => {
        // Error handling
        if (error.status === 401) {
            this.setToken(null);
            require("../app/store").dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export function setToken(token) {
    if (token) {
        window.localStorage.setItem('jwtToken', token);
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
    } else {
        window.localStorage.removeItem('jwtToken');
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function getToken() {
    return window.localStorage.getItem('jwtToken');
}

//axios.defaults.baseURL = "/api/" // Requires changes in backend

export default axios;