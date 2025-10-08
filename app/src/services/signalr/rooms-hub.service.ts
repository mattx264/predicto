import * as signalR from "@microsoft/signalr";
import { signalRService } from "./signalr.service";
import type { RoomDTO } from "../../types/room.types";

const BACKEND_URL = "http://localhost:5116";
const ROOMS_HUB_URL = `${BACKEND_URL}/roomsHub`;

export class RoomsHubService {
  private connection: signalR.HubConnection | null = null;

  async connect(onRoomsReceived: (rooms: RoomDTO[]) => void): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      console.log("⚠️ Already connected to RoomsHub");
      return;
    }

    this.connection = signalRService.createConnection(ROOMS_HUB_URL);

    this.connection.on("GetRooms", (rooms: RoomDTO[]) => {
      console.log("📥 Received rooms from backend:", rooms);
      onRoomsReceived(rooms);
    });

    try {
      await signalRService.startConnection(this.connection, "RoomsHub");
    } catch (error) {
      console.error("❌ Failed to connect to RoomsHub:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await signalRService.stopConnection(this.connection);
      this.connection = null;
    }
  }

  isConnected(): boolean {
    return (
      this.connection?.state === signalR.HubConnectionState.Connected || false
    );
  }

  getConnectionState(): signalR.HubConnectionState | null {
    return this.connection?.state || null;
  }
}

export const roomsHubService = new RoomsHubService();
