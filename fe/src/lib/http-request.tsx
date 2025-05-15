import httpClient from "./http-client";

export class HttpRequest {
  async get(endpoint: string) {
    return await httpClient.get(endpoint);
  }

  async post(endpoint: string, data: unknown) {
    return await httpClient.post(endpoint, data);
  }

  async put(endpoint: string, data: unknown) {
    return await httpClient.put(endpoint, data);
  }   
  
  async delete(endpoint: string) {
    return await httpClient.delete(endpoint);
  }
}
