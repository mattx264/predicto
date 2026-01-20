/// <reference lib="webworker" />

import { Client } from "./client";

const api = new Client(import.meta.env.VITE_API_URL);

self.onmessage = async (event) => {
  const { type, payload } = event.data;

  try {
    switch (type) {
      case "GET_USERS": {
        const users = await api.getTournamentById(payload.id);
        self.postMessage({ type: "SUCCESS", data: users });
        break;
      }

      default:
        throw new Error("Unknown message type");
    }
  } catch (error) {
    self.postMessage({
      type: "ERROR",
      error: error instanceof Error ? error.message : error,
    });
  }
};
