import HttpService from "./HttpService";

export async function createRequest(data) {
  return await HttpService.post("group/create", data);
}

export async function fetchGroups() {
  return await HttpService.get("group/all");
}

export async function fetchGroup(data) {
  return await HttpService.get("group/id/" + data);
}

export async function joinGroupRequest(data) {
  return await HttpService.post("group/join/" + data);
}

export async function leaveGroupRequest(data) {
  return await HttpService.post("group/leave/" + data);
}

export async function editGroupRequest(data) {
  return await HttpService.post("group/edit/" + data._id, data);
}

export async function deleteGroupRequest(data) {
  return await HttpService.post("group/delete/" + data);
}

export async function fetchProcessedGroupChat(data) {
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
