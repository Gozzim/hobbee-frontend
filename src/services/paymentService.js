import HttpService from "./HttpService";
import { processToken } from "./UserService";

export async function sendPremiumRequest(order) {
    const resp = await HttpService.post("/payment/subscribe", order);
    await processToken(resp.data.token);
    return resp.data.receipt;
}

export async function sendPremiumCancelRequest() {
    return await HttpService.get("/payment/cancel");
}
