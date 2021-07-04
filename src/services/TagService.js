import HttpService from "./HttpService";

export async function fetchTags() {
  const resp = await HttpService.get("group/tags");
  return resp.data;
}
