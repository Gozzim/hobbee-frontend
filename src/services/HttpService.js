import axios from "axios";
import {logout} from "../redux/actions";

axios.interceptors.response.use(
    (resp) => {
        return resp;
    },
    (error) => {
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

setToken(window.localStorage.getItem('jwtToken'));

export default axios;