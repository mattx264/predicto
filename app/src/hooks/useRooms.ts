import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { roomsHubService } from "../services/signalr/signalr/rooms-hub.service";
import {
  roomsSignal,
  roomsConnectionStatusSignal,
  roomsLoadingSignal,
  roomsErrorSignal,
  setRooms,
  setConnectionStatus,
  setRoomsLoading,
  setRoomsError,
  addRoom,
  //updateRoomParticipants,
} from "../signals/rooms.signals";
import {
  mapRoomDtoToRoom,
  type Room,
  // type UserJoinedEvent,
  // type UserLeftEvent,
} from "../types/types";
import type { RoomDTO } from "../services/nsawg/client";

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

        const handleRoomsReceived = (roomsDto: RoomDTO[]) => {
          if (!isMounted) return;

          const mappedRooms = roomsDto.map(mapRoomDtoToRoom);

          setRooms(mappedRooms);
          setConnectionStatus("connected");
          setRoomsLoading(false);
        };

        const handleRoomCreated = (roomDto: RoomDTO) => {
          if (!isMounted) return;

          const mappedRoom = mapRoomDtoToRoom(roomDto);

          addRoom(mappedRoom);
        };

        // const handleUserJoined = (event: UserJoinedEvent) => {
        //   if (!isMounted) return;

        //   updateRoomParticipants(event.roomId, event.participantsCount);
        // };

        // const handleUserLeft = (event: UserLeftEvent) => {
        //   if (!isMounted) return;

        //   updateRoomParticipants(event.roomId, event.participantsCount);
        // };

        await roomsHubService.connect(
          handleRoomsReceived,
          handleRoomCreated,
          //  handleUserJoined,
          //   handleUserLeft
        );

        if (isMounted) {
          console.log("successfully connected to RoomsHub");
        }
      } catch (error) {
        if (!isMounted) return;

        console.error("❌ Error connecting to RoomsHub:", error);
        setConnectionStatus("error");
        setRoomsError(
          error instanceof Error ? error.message : "Failed to connect to rooms",
        );
        setRoomsLoading(false);
      }
    };

    connectToRoomsHub();

    return () => {
      isMounted = false;
      roomsHubService.disconnect();
    };
  }, []);

  const refetch = async () => {
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
