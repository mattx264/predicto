import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  currentRoomSignal,
  roomConnectionStatusSignal,
  roomLoadingSignal,
  roomErrorSignal,
  setCurrentRoom,
  setRoomConnectionStatus,
  setRoomLoading,
  setRoomError,
  clearCurrentRoom,
} from "../signals/room-detail.signals";
import { mapRoomDtoToRoom, type Room } from "../types/types";
import { roomHubService } from "../services/signalr/signalr/room-hub.service";
import { roomsHubService } from "../services/signalr/signalr/rooms-hub.service";
import type { RoomDTO } from "../services/nsawg/client";

interface UseRoomReturn {
  room: Room | null;
  isLoading: boolean;
  error: string | null;
  connectionStatus:
  | "disconnected"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "error";
  refetch: () => Promise<void>;
}

export const useRoom = (roomId: string): UseRoomReturn => {
  useSignals();

  useEffect(() => {
    if (!roomId) return;

    let isMounted = true;

    const connectToRoom = async () => {
      try {
        setRoomConnectionStatus("connecting");
        setRoomLoading(true);
        setRoomError(null);

        const handleRoomDataReceived = (roomDto: RoomDTO) => {
          if (!isMounted) return;

          const mappedRoom = mapRoomDtoToRoom(roomDto);

          setCurrentRoom(mappedRoom);
          setRoomConnectionStatus("connected");
          setRoomLoading(false);
        };

        await roomHubService.connect(roomId, handleRoomDataReceived);

        const roomsConnection = roomsHubService.getConnection();

        if (roomsConnection) {
          const handleUserJoined = (data: { roomId: number }) => {
            if (data.roomId === Number(roomId)) {
              // Room will be automatically updated via GetRoom or RoomUpdated
            }
          };

          const handleUserLeft = (data: { roomId: number }) => {
            if (data.roomId === Number(roomId)) {
              // Room will be automatically updated via GetRoom or RoomUpdated
            }
          };

          roomsConnection.on("UserJoined", handleUserJoined);
          roomsConnection.on("UserLeft", handleUserLeft);

          return () => {
            roomsConnection.off("UserJoined", handleUserJoined);
            roomsConnection.off("UserLeft", handleUserLeft);
          };
        }
      } catch (error) {
        if (!isMounted) return;

        setRoomConnectionStatus("error");
        setRoomError(
          error instanceof Error
            ? error.message
            : `Failed to connect to room ${roomId}`
        );
        setRoomLoading(false);
      }
    };

    connectToRoom();

    return () => {
      isMounted = false;
      roomHubService.disconnect(roomId);
      clearCurrentRoom();
    };
  }, [roomId]);

  const refetch = async () => {
    await roomHubService.disconnect(roomId);
  };

  return {
    room: currentRoomSignal.value,
    isLoading: roomLoadingSignal.value,
    error: roomErrorSignal.value,
    connectionStatus: roomConnectionStatusSignal.value,
    refetch,
  };
};
