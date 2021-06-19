import axios from "./HttpService";

export class UserService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }

  static register(user, pass, isAdmin) {
    return new Promise((resolve, reject) => {
      axios.post(
        `${UserService.baseURL()}/register`,
        {
          username: user,
          password: pass,
          isAdmin: isAdmin,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static login(user, pass) {
    return new Promise((resolve, reject) => {
      axios.post(
        `${UserService.baseURL()}/login`,
        {
          username: user,
          password: pass,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem("jwtToken");
  }
}
