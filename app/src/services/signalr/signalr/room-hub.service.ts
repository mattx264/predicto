import * as signalR from "@microsoft/signalr";
import apiService from "../api.service";
import { signalRService } from "../signalr.service";
import type { RoomDTO } from "../../nsawg/client";

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
      return;
    }

    const ROOM_HUB_URL = `${apiService.getBackendUrl()}/roomHub/${roomId}`;

    const connection = signalRService.createConnection(ROOM_HUB_URL);

    connection.off("GetRoom");
    connection.off("RoomUpdated");

    connection.on("GetRoom", (room: RoomDTO) => {
      onRoomDataReceived(room);
    });

    connection.on("RoomUpdated", (room: RoomDTO) => {
      onRoomDataReceived(room);
    });

    this.connections.set(connectionKey, connection);

    try {
      await signalRService.startConnection(connection, `RoomHub/${roomId}`);

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiService.getBackendUrl()}/api/room/${roomId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const room: RoomDTO = await response.json();

        onRoomDataReceived(room);
      } else {
        throw new Error(`Failed to fetch room: ${response.statusText}`);
      }
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
      connection.off("GetRoom");
      connection.off("RoomUpdated");

      await signalRService.stopConnection(connection);
      this.connections.delete(connectionKey);
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
