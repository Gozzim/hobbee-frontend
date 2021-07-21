import HttpService from "./HttpService";

export async function submitFeedbackRequest(id, data) {
    return await HttpService.post("/storage/feedback/" + id, data);
}

export async function feedbackFormRequest(id) {
    const resp = await HttpService.get("/storage/feedback/" + id);
    return resp.data;
}
