import { signal, computed } from "@preact/signals-react";

export const entryFeeSignal = signal<number>(50);
export const maxParticipantsSignal = signal<number>(10);

export const prizePoolTargetSignal = computed(() => {
  const fee = Number(entryFeeSignal.value) || 0;
  const participants = Number(maxParticipantsSignal.value) || 0;
  return fee * participants;
});
