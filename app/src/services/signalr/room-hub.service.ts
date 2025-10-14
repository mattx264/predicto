import * as signalR from "@microsoft/signalr";
import { signalRService } from "./signalr.service";

import apiService from "./api.service";
import type { RoomDTO } from "../../types/types";

export class RoomHubService {
  private connections: Map<string, signalR.HubConnection> = new Map();

  async connect(
    roomId: string,
    onRoomDataReceived: (room: RoomDTO) => void
  ): Promise<void> {
    const connectionKey = `room-${roomId}`;

    const existingConnection = this.connections.get(connectionKey);
    if (
      existingConnection &&
      existingConnection.state === signalR.HubConnectionState.Connected
    ) {
      console.log(`⚠️ Już połączono z pokojem ${roomId}`);
      return;
    }

    const ROOM_HUB_URL = `${apiService.getBackendUrl()}/roomHub/${roomId}`;

    const connection = signalRService.createConnection(ROOM_HUB_URL);

    connection.on("GetRoom", (room: RoomDTO) => {
      console.log(`📥 Otrzymano dane dla pokoju ${roomId}:`, room);
      onRoomDataReceived(room);
    });

    connection.on("RoomUpdated", (room: RoomDTO) => {
      console.log(`🔄 Pokój ${roomId} został zaktualizowany:`, room);
      onRoomDataReceived(room);
    });

    this.connections.set(connectionKey, connection);

    try {
      await signalRService.startConnection(connection, `RoomHub/${roomId}`);
    } catch (error) {
      console.error(`❌ Błąd połączenia z pokojem ${roomId}:`, error);
      this.connections.delete(connectionKey);
      throw error;
    }
  }

  async disconnect(roomId: string): Promise<void> {
    const connectionKey = `room-${roomId}`;
    const connection = this.connections.get(connectionKey);

    if (connection) {
      await signalRService.stopConnection(connection);
      this.connections.delete(connectionKey);
      console.log(`✅ Rozłączono z pokojem ${roomId}`);
    }
  }

  isConnected(roomId: string): boolean {
    const connectionKey = `room-${roomId}`;
    const connection = this.connections.get(connectionKey);
    return connection?.state === signalR.HubConnectionState.Connected || false;
  }

  getConnection(roomId: string): signalR.HubConnection | undefined {
    const connectionKey = `room-${roomId}`;
    return this.connections.get(connectionKey);
  }

  async disconnectAll(): Promise<void> {
    const promises = Array.from(this.connections.keys()).map((key) =>
      this.disconnect(key.replace("room-", ""))
    );
    await Promise.all(promises);
  }
}

export const roomHubService = new RoomHubService();
