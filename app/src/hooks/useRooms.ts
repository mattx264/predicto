import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { roomsHubService } from "../services/signalr/rooms-hub.service";
import {
  roomsSignal,
  roomsConnectionStatusSignal,
  roomsLoadingSignal,
  roomsErrorSignal,
  setRooms,
  setConnectionStatus,
  setRoomsLoading,
  setRoomsError,
} from "../signals/rooms.signals";
import { mapRoomDtoToRoom, type RoomDTO, type Room } from "../types/types";

interface UseRoomsReturn {
  rooms: Room[];
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

export const useRooms = (): UseRoomsReturn => {
  useSignals();

  useEffect(() => {
    let isMounted = true;

    const connectToRoomsHub = async () => {
      try {
        setConnectionStatus("connecting");
        setRoomsLoading(true);
        setRoomsError(null);

        console.log("🔌 Connecting to RoomsHub...");

        const handleRoomsReceived = (roomsDto: RoomDTO[]) => {
          if (!isMounted) return;

          console.log("📦 Processing rooms from backend:", roomsDto);

          const mappedRooms = roomsDto.map(mapRoomDtoToRoom);

          setRooms(mappedRooms);
          setConnectionStatus("connected");
          setRoomsLoading(false);

          console.log("✅ Rooms loaded successfully:", mappedRooms);
        };

        await roomsHubService.connect(handleRoomsReceived);

        if (isMounted) {
          console.log("✅ Successfully connected to RoomsHub");
        }
      } catch (error) {
        if (!isMounted) return;

        console.error("❌ Error connecting to RoomsHub:", error);
        setConnectionStatus("error");
        setRoomsError(
          error instanceof Error ? error.message : "Failed to connect to rooms"
        );
        setRoomsLoading(false);
      }
    };

    connectToRoomsHub();

    return () => {
      isMounted = false;
      console.log("🧹 Cleaning up RoomsHub connection");
      roomsHubService.disconnect();
    };
  }, []);

  const refetch = async () => {
    console.log("🔄 Refetching rooms...");
    await roomsHubService.disconnect();
  };

  return {
    rooms: roomsSignal.value,
    isLoading: roomsLoadingSignal.value,
    error: roomsErrorSignal.value,
    connectionStatus: roomsConnectionStatusSignal.value,
    refetch,
  };
};
