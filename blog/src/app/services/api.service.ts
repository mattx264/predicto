const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5116";

const apiService = {
  getBackendUrl: (): string => {
    return BACKEND_URL;
  },
};

export default apiService;
