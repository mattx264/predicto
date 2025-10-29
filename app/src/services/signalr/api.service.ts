const isDevelopment = window.location.hostname === "localhost";

const BACKEND_URL = isDevelopment
  ? "http://localhost:5116"
  : "http://predicto.gg";
//const BACKEND_URL = "http://predicto.gg";
const apiService = {
  getBackendUrl: (): string => {
    return BACKEND_URL;
  },
};

export default apiService;
