const isDevelopment = window.location.hostname === "localhost";

const BACKEND_URL = isDevelopment
  ? "http://localhost:5116"
  : "https://predicto.game";

const apiService = {
  getBackendUrl: (): string => {
    return BACKEND_URL;
  },
};

export default apiService;
