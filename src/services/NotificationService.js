import { HttpService } from "./HttpService";

/*
 * TODO:
 *  - Count function
 *  - Rework HttpService
 */

export async function fetchUserNotifications() {
    try {
        const resp = await HttpService.get("/data/Notifications");
        return { success: true, request: resp.data };
    } catch (error) {
        return { success: false, msg: error.message };
    }
}