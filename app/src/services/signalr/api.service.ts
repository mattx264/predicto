// const isDevelopment = window.location.hostname === "localhost";

import { Client } from "../nsawg/client";

// const BACKEND_URL = isDevelopment
//   ? "http://localhost:5116"
//   : "http://predicto.gg";
// //const BACKEND_URL = "http://predicto.gg";
// const apiService = {
//   getBackendUrl: (): string => {
//     return BACKEND_URL;
//   },
// };

// export default apiService;

const BACKEND_URL = "http://predicto.gg";
const BACKEND_URL_LOCAL = "https://localhost:7174";

//const BACKEND_URL = "http://localhost:5116";
class ApiService {
  private client: Client | null = null;

  getBackendUrl(): string {
    if (window.location.hostname === "localhost") {
      return BACKEND_URL_LOCAL;
    }
    return BACKEND_URL;
  }

  getClient(): Client {
    if (!this.client) {
      this.client = new Client(this.getBackendUrl(), {
        fetch: async (
          url: RequestInfo,
          init?: RequestInit,
        ): Promise<Response> => {
          const headers = new Headers(init?.headers);

          const token = localStorage.getItem("authToken");
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }

          // const companyId = GetCompanyIdFromUrl();
          // if (companyId) {
          //   headers.set("X-Company-Id", companyId.toString());
          // }

          init = {
            ...init,
            headers,
          };

          const response = await fetch(url, init);

          if (response.status === 401) {
            localStorage.removeItem("authToken");
            this.resetClient();
            window.location.href = "/login";
          }

          return response;
        },
      });
    }
    return this.client;
  }

  resetClient(): void {
    this.client = null;
  }
}

const apiService = new ApiService();
export default apiService;
