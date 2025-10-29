import * as signalR from "@microsoft/signalr";
import { signalRService } from "./signalr.service";
import apiService from "./api.service";
import type { RoomDTO } from "../../types/types";

export class RoomsHubService {
  private connection: signalR.HubConnection | null = null;

  async connect(
    onRoomsReceived: (rooms: RoomDTO[]) => void,
    onRoomCreated: (room: RoomDTO) => void
  ): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      console.log("⚠️ Już połączono z RoomsHub");
      return;
    }

    const ROOMS_HUB_URL = `${apiService.getBackendUrl()}/roomsHub`;

    this.connection = signalRService.createConnection(ROOMS_HUB_URL);

    this.connection.on("GetRooms", (rooms: RoomDTO[]) => {
      console.log("📥 Otrzymano listę pokoi z backendu:", rooms);
      onRoomsReceived(rooms);
    });

    this.connection.on("RoomCreated", (room: RoomDTO) => {
      console.log("🆕 Nowy pokój został utworzony:", room);
      onRoomCreated(room);
    });

    try {
      await signalRService.startConnection(this.connection, "RoomsHub");
    } catch (error) {
      console.error("❌ Błąd połączenia z RoomsHub:", error);
      this.connection = null;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await signalRService.stopConnection(this.connection);
      this.connection = null;
      console.log("✅ Rozłączono z RoomsHub");
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
