import HttpService, {getToken, setToken} from "./HttpService";

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
  console.log("groupservice 1");
  await setToken(getToken());
  console.log("groupservice 2");
  return HttpService.post("group/join-group/" + data);
}