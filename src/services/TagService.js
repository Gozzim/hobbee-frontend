import HttpService from "./HttpService";

export async function fetchTags() {
  return await HttpService.get("storage/tags");
}
