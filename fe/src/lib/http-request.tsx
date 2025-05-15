import httpClient from "./http-client";
export class httpRequest {

  async get(endpoint: string) {
    const response = await httpClient.get(endpoint);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }

  async post(endpoint: string, data: any) {
    const response = await httpClient.post(endpoint, data);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }
  async put(endpoint: string, data: any) {
    const response = await httpClient.put(endpoint, data);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }
  async delete(endpoint: string) {
    const response = await httpClient.delete(endpoint);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }
}
