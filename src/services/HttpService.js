import axios from "axios";
import { logout } from "../redux/reducers/userReducer";

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
    window.localStorage.setItem("jwtToken", token);
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    window.localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function getToken() {
  return window.localStorage.getItem("jwtToken");
}

axios.defaults.baseURL =
  window.location.protocol + "//" + window.location.hostname + ":4000/api/";

export default axios;
