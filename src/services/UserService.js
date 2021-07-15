import HttpService, { setToken } from "./HttpService";

export async function registrationRequest(
  username,
  email,
  password,
  bday,
  hobbies
) {
  const resp = await HttpService.post("auth/register", {
    username: username,
    email: email,
    password: password,
    dateOfBirth: bday,
    hobbies: [...hobbies],
  });
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
  return await HttpService.post("auth/forgot", {
    email: email
  });
}

export async function resetPasswordRequest(user, token, password) {
  const resp = await HttpService.post("auth/reset", {
    user: user,
    token: token,
    password: password
  });
  return await processToken(resp.data.token);
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
  const resp = await HttpService.get("auth/me");
  // TODO: Token Refreshment
  const user = { ...resp };
  return user;
}

async function processToken(token) {
  setToken(token);

  return await fetchMe();
}
