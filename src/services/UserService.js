import HttpService, { setToken } from "./HttpService";

export async function registrationRequest(userdata) {
  const resp = await HttpService.post("auth/register", userdata);
  return await processToken(resp.data.token);
}

export async function loginRequest(username, password) {
  const resp = await HttpService.post("auth/login", {
    username: username,
    password: password,
  });
  return await processToken(resp.data.token);
}

export async function logoutRequest() {
  return await HttpService.post("auth/logout");
}

export async function forgotPasswordRequest(email) {
  return await HttpService.post("user/forgot", {
    email: email
  });
}

export async function resetPasswordRequest(user, token, password) {
  const resp = await HttpService.post("user/reset", {
    user: user,
    token: token,
    password: password
  });
  return await processToken(resp.data.token);
}

export async function changePasswordRequest(current, password) {
   return await HttpService.post("user/updatePass", {
    current: current,
    password: password,
  });
}

export async function isUsernameAvailable(username) {
  try {
    const resp = await HttpService.post("auth/exists/username", {username: username});
    return resp.data;
  } catch (err) {
    return err.message;
  }
}

export async function fetchMe() {
  return await HttpService.get("user/me");
}

export async function reportUserRequest(data) {
  return await HttpService.post("user/report/" + data.username, data);
}

export async function processToken(token) {
  setToken(token);

  return await fetchMe();
}
