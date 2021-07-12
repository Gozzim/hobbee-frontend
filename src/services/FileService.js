import HttpService from "./HttpService";

export function getFileUrl(id) {
  return `${HttpService.defaults.baseURL}storage/file/view/${id}`;
}

export async function uploadRequest(file) {
  const formData = new FormData();
  formData.append("file", file);

  return await HttpService.post("storage/file/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
