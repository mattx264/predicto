import { signal, computed } from "@preact/signals-react";
import type { Room } from "../types/room.types";

export const currentRoomSignal = signal<Room | null>(null);

export const roomConnectionStatusSignal = signal<
  "disconnected" | "connecting" | "connected" | "reconnecting" | "error"
>("disconnected");

export const roomLoadingSignal = signal<boolean>(false);

export const roomErrorSignal = signal<string | null>(null);

export const hasRoomDataSignal = computed(
  () => currentRoomSignal.value !== null
);

export const roomParticipantsCountSignal = computed(
  () => currentRoomSignal.value?.participants || 0
);

export const isRoomFullSignal = computed(() => {
  const room = currentRoomSignal.value;
  if (!room) return false;
  return room.participants >= room.maxParticipants;
});

export const isRoomOpenSignal = computed(
  () => currentRoomSignal.value?.status === "open"
);

export const setCurrentRoom = (room: Room) => {
  currentRoomSignal.value = room;
  console.log(`✅ Room detail signal updated:`, room);
};

export const updateCurrentRoom = (updates: Partial<Room>) => {
  if (currentRoomSignal.value) {
    currentRoomSignal.value = {
      ...currentRoomSignal.value,
      ...updates,
    };
  }
};

export const clearCurrentRoom = () => {
  currentRoomSignal.value = null;
};

export const setRoomConnectionStatus = (
  status: "disconnected" | "connecting" | "connected" | "reconnecting" | "error"
) => {
  roomConnectionStatusSignal.value = status;
};

export const setRoomLoading = (loading: boolean) => {
  roomLoadingSignal.value = loading;
};

export const setRoomError = (error: string | null) => {
  roomErrorSignal.value = error;
};

export const resetRoomDetailState = () => {
  currentRoomSignal.value = null;
  roomConnectionStatusSignal.value = "disconnected";
  roomLoadingSignal.value = false;
  roomErrorSignal.value = null;
};
