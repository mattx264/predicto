import { signal, computed } from "@preact/signals-react";
import type { Room } from "../types/types";

export const roomsSignal = signal<Room[]>([]);

export const roomsConnectionStatusSignal = signal;
"disconnected" |
  "connecting" |
  "connected" |
  "reconnecting" |
  ("error" > "disconnected");

export const roomsLoadingSignal = signal<boolean>(false);

export const roomsErrorSignal = signal<string | null>(null);

export const openRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.status === "open")
);

export const activeRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.status === "active")
);

export const endedRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.status === "ended")
);

export const publicRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => !room.isPrivate)
);

export const privateRoomsSignal = computed(() =>
  roomsSignal.value.filter((room) => room.isPrivate)
);

export const totalRoomsCountSignal = computed(() => roomsSignal.value.length);

export const hasRoomsSignal = computed(() => roomsSignal.value.length > 0);

export const setRooms = (rooms: Room[]) => {
  roomsSignal.value = rooms;
  console.log(`✅ Rooms signal updated: ${rooms.length} rooms`);
};

export const addRoom = (room: Room) => {
  roomsSignal.value = [...roomsSignal.value, room];
};

export const updateRoom = (roomId: string, updates: Partial<Room>) => {
  roomsSignal.value = roomsSignal.value.map((room) =>
    room.id === roomId ? { ...room, ...updates } : room
  );
};

export const removeRoom = (roomId: string) => {
  roomsSignal.value = roomsSignal.value.filter((room) => room.id !== roomId);
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

export const clearRooms = () => {
  roomsSignal.value = [];
};

export const resetRoomsState = () => {
  roomsSignal.value = [];
  roomsConnectionStatusSignal.value = "disconnected";
  roomsLoadingSignal.value = false;
  roomsErrorSignal.value = null;
};
