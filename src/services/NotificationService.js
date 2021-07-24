import HttpService from "./HttpService";

export async function fetchNotificationRequest(date) {
  const resp = await HttpService.get("/storage/notifications?since=" + date);
  return resp.data;
}

export async function readNotificationRequest(notification) {
  const resp = await HttpService.post("/storage/notifications/read/" + notification);
  return resp.data;
}

export async function readAllNotificationsRequest() {
  const resp = await HttpService.get("/storage/notifications/clear");
  return resp.data;
}
