import { signal, computed } from "@preact/signals-react";
import type { Room } from "../types/types";

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

export const canJoinRoomSignal = computed(() => {
  const room = currentRoomSignal.value;
  if (!room) return false;
  return room.status === "open" && room.participants < room.maxParticipants;
});

export const roomProgressSignal = computed(() => {
  const room = currentRoomSignal.value;
  if (!room) return 0;
  return (room.participants / room.maxParticipants) * 100;
});

export const setCurrentRoom = (room: Room) => {
  currentRoomSignal.value = room;
};

export const updateCurrentRoom = (updates: Partial<Room>) => {
  const current = currentRoomSignal.value;
  if (current) {
    currentRoomSignal.value = {
      ...current,
      ...updates,
    };
  }
};

export const updateRoomParticipantsCount = (count: number) => {
  updateCurrentRoom({ participants: count });
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
