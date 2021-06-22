import HttpService, { setToken } from "./HttpService";

export class UserService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }
}

async function processToken(token) {
  setToken(token);

  return await fetchUser();
}

export async function loginRequest(username, password) {
  const resp = await HttpService.post(`${UserService.baseURL()}/login`, {
    username: username,
    password: password,
  });
  return await processToken(resp.data.token);
}

export async function logoutRequest() {
  const resp = await HttpService.post(`${UserService.baseURL()}/logout`);
  return resp;
}

export async function fetchUser() {
  const resp = await HttpService.get(`${UserService.baseURL()}/me`);
  const user = { ...resp.data };
  return user;
}
