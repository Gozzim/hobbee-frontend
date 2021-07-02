import HttpService from "./HttpService";

export async function fetchNotificationRequest(date) {
  const resp = await HttpService.get("/storage/notifications?since=" + date);
  return resp.data;
}
