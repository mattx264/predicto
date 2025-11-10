import { signal, computed } from "@preact/signals-react";
import type { Room } from "../types/types";

export const roomsSignal = signal<Room[]>([]);
export const roomsConnectionStatusSignal = signal<
  "disconnected" | "connecting" | "connected" | "reconnecting" | "error"
>("disconnected");

export const roomsLoadingSignal = signal<boolean>(true);
export const roomsErrorSignal = signal<string | null>(null);

export const roomsCountSignal = computed(() => roomsSignal.value.length);

export const openRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.status === "open")
);

export const fullRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.participants >= room.maxParticipants)
);

export const myRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.isUserInRoom)
);

export const setRooms = (rooms: Room[]) => {
  roomsSignal.value = rooms;
};

export const setConnectionStatus = (
  status: "disconnected" | "connecting" | "connected" | "reconnecting" | "error"
) => {
  roomsConnectionStatusSignal.value = status;
};

export const setRoomsLoading = (loading: boolean) => {
  roomsLoadingSignal.value = loading;
};

export const setRoomsError = (error: string | null) => {
  roomsErrorSignal.value = error;
};

export const addRoom = (room: Room) => {
  roomsSignal.value = [...roomsSignal.value, room];
};

export const updateRoomInList = (roomId: string, updates: Partial<Room>) => {
  roomsSignal.value = roomsSignal.value.map((room) =>
    room.id === roomId ? { ...room, ...updates } : room
  );
};

export const updateRoomParticipants = (
  roomId: number,
  participantsCount: number
) => {
  updateRoomInList(roomId.toString(), { participants: participantsCount });
};

export const removeRoomFromList = (roomId: string) => {
  roomsSignal.value = roomsSignal.value.filter((room) => room.id !== roomId);
};

export const getRoomById = (roomId: string): Room | undefined => {
  return roomsSignal.value.find((room) => room.id === roomId);
};

export const resetRoomsState = () => {
  roomsSignal.value = [];
  roomsConnectionStatusSignal.value = "disconnected";
  roomsLoadingSignal.value = true;
  roomsErrorSignal.value = null;
};
