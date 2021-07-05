import HttpService from "./HttpService";

export async function createRequest(state) {
  await HttpService.post("group/create", state);
}
