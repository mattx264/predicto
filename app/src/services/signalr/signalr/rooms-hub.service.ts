import * as signalR from "@microsoft/signalr";
import apiService from "../api.service";
import { signalRService } from "../signalr.service";
import type { RoomDTO } from "../../nsawg/client";

export class RoomsHubService {
  private connection: signalR.HubConnection | null = null;

  async connect(
    onRoomsUpdate: (rooms: RoomDTO[]) => void,
    onRoomCreated?: (room: RoomDTO) => void,
    // onUserJoined?: (data: {
    //   roomId: number;
    //   userId: number;
    //   userName: string;
    //   participantsCount: number;
    // }) => void,
    // onUserLeft?: (data: {
    //   roomId: number;
    //   userId: number;
    //   participantsCount: number;
    // }) => void
  ): Promise<void> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      return;
    }

    const ROOMS_HUB_URL = `${apiService.getBackendUrl()}/roomsHub`;
    this.connection = signalRService.createConnection(ROOMS_HUB_URL);

    this.connection.on("GetRooms", (rooms: RoomDTO[]) => {
      onRoomsUpdate(rooms);
    });

    if (onRoomCreated) {
      this.connection.on("RoomCreated", (room: RoomDTO) => {
        onRoomCreated(room);
      });
    }

    // if (onUserJoined) {
    //   this.connection.on(
    //     "UserJoined",
    //     (data: {
    //       roomId: number;
    //       userId: number;
    //       userName: string;
    //       participantsCount: number;
    //     }) => {
    //       onUserJoined(data);
    //     }
    //   );
    // }

    // if (onUserLeft) {
    //   this.connection.on(
    //     "UserLeft",
    //     (data: {
    //       roomId: number;
    //       userId: number;
    //       participantsCount: number;
    //     }) => {
    //       onUserLeft(data);
    //     }
    //   );
    // }

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
      this.connection.off("GetRooms");
      this.connection.off("RoomCreated");
      //this.connection.off("UserJoined");
      // this.connection.off("UserLeft");

      await signalRService.stopConnection(this.connection);
      this.connection = null;
    }
  }

  getConnection(): signalR.HubConnection | null {
    return this.connection;
  }

  isConnected(): boolean {
    return (
      this.connection?.state === signalR.HubConnectionState.Connected || false
    );
  }
}

export const roomsHubService = new RoomsHubService();
