const isDevelopment = window.location.hostname === "localhost";

const BACKEND_URL = isDevelopment
  ? "http://localhost:3000"
  : "http://blog-predicto.game";

const blogApiService = {
  getBackendUrl: (): string => {
    return BACKEND_URL;
  },
};

export default blogApiService;
