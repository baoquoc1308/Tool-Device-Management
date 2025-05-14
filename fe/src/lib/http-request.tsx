import axios from "axios";
export class httpRequest {
  private baseUrl: string;
  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error("VITE_API_URL is not defined");
    }
    this.baseUrl = apiUrl;
  }

  async get(endpoint: string) {
    const response = await axios.get(`${this.baseUrl}${endpoint}`);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }

  async post(endpoint: string, data: any) {
    const response = await axios.post(`${this.baseUrl}${endpoint}`, data);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }
  async put(endpoint: string, data: any) {
    const response = await axios.put(`${this.baseUrl}${endpoint}`, data);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }
  async delete(endpoint: string) {
    const response = await axios.delete(`${this.baseUrl}${endpoint}`);
    if (response.status !== 200) {
      return { success: false, data: response.statusText };
    }
    return { success: true, data: response.data };
  }
}
