import { HttpService } from "./HttpService";

/*
 * TODO:
 *  - Count function
 */

export async function getUserNotifications() {
    try {
        const resp = await HttpService.get("/data/Notifications");
        return { success: true, data: resp.content };
    } catch (error) {
        return { success: false, data: error.message };
    }
}