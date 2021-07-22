import HttpService, { getToken, setToken } from "./HttpService";

export async function createRequest(data) {
  return await HttpService.post("group/create", data);
}

export async function fetchGroups() {
  return await HttpService.get("group/groups");
}

export async function fetchGroup(data) {
  await setToken(getToken());
  return await HttpService.get("group/group/" + data);
}

export async function joinGroupRequest(data) {
  await setToken(getToken());
  return await HttpService.post("group/join/" + data);
}

export async function leaveGroupRequest(data) {
  await setToken(getToken());
  return await HttpService.post("group/leave/" + data);
}

export async function editGroupRequest(data) {
  await setToken(getToken());
  return await HttpService.post("group/edit/" + data._id, data);
}

export async function fetchProcessedGroupChat(data) {
  await setToken(getToken());
  return await HttpService.get("group/chat/" + data);
}

export async function fetchMyGroups() {
  return await HttpService.get("/group/mine");
}

export async function fetchRecommendedGroups() {
  return await HttpService.get("/group/recommended");
}

export async function fetchGroupsInMyArea() {
  return await HttpService.get("/group/in-my-area");
}
