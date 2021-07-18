import HttpService from "./HttpService";
import { processToken } from "./UserService";

export async function sendPremiumRequest(order) {
    const resp = await HttpService.post("/payment/subscribe", order);
    return await processToken(resp.data.token);
}
