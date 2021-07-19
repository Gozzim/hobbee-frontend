import HttpService, { getToken, setToken } from "./HttpService";

export async function createRequest(data) {
  await HttpService.post("group/create", data);
}

export async function fetchGroups() {
  return await HttpService.get("group/groups");
}

export async function fetchGroup(data) {
  await setToken(getToken());
  return await HttpService.get("group/group/" + data);
}

export async function joinGroup(data) {
  await setToken(getToken());
  return HttpService.post("group/join-group/" + data);
}

export async function leaveGroup(data) {
  await setToken(getToken());
  return HttpService.post("group/leave-group/" + data);
}

export async function fetchProcessedGroupChat(data) {
  await setToken(getToken());
  return await HttpService.get("group/group-chat/" + data);
}