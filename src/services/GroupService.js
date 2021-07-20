import HttpService from "./HttpService";

export async function createRequest(data) {
  await HttpService.post("group/create", data);
}

export async function fetchGroups() {
  return await HttpService.get("group/groups");
}

export async function fetchMyGroups() {
  return await HttpService.get("/group/mine");
}

export async function fetchRecommendedGroups() {
  return await HttpService.get("/group/recommended");
}
