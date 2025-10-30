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
import { mapRoomDtoToRoom, type RoomDTO, type Room } from "../types/types";
import { roomHubService } from "../services/signalr/signalr/room-hub.service";

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

        console.log(`🔌 Connecting to room ${roomId}...`);

        const handleRoomDataReceived = (roomDto: RoomDTO) => {
          if (!isMounted) return;

          console.log(`📦 Processing room data:`, roomDto);

          const mappedRoom = mapRoomDtoToRoom(roomDto);

          setCurrentRoom(mappedRoom);
          setRoomConnectionStatus("connected");
          setRoomLoading(false);

          console.log(`✅ Room ${roomId} loaded successfully:`, mappedRoom);
        };

        await roomHubService.connect(roomId, handleRoomDataReceived);

        if (isMounted) {
          console.log(`✅ Successfully connected to room ${roomId}`);
        }
      } catch (error) {
        if (!isMounted) return;

        console.error(`❌ Error connecting to room ${roomId}:`, error);
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
      console.log(`🧹 Cleaning up room ${roomId} connection`);
      roomHubService.disconnect(roomId);
      clearCurrentRoom();
    };
  }, [roomId]);

  const refetch = async () => {
    console.log(`🔄 Refetching room ${roomId}...`);
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
