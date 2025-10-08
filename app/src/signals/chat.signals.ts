import { signal, computed } from "@preact/signals-react";
import type { ChatChannel, ChatMessage } from "../types/room.types";

export type ChatChannelType = "room" | "match";

export const chatMessagesSignal = signal<Record<string, ChatMessage[]>>({});

export const unreadCountSignal = signal<Record<string, number>>({});

export const activeChannelSignal = signal<ChatChannel | null>(null);

export const onlineUsersSignal = signal<Record<string, number>>({});

export const currentChannelMessagesSignal = computed(() => {
  const channel = activeChannelSignal.value;
  if (!channel) return [];

  return chatMessagesSignal.value[channel.id] || [];
});

export const totalUnreadSignal = computed(() =>
  Object.values(unreadCountSignal.value).reduce((sum, count) => sum + count, 0)
);

export const currentChannelOnlineUsersSignal = computed(() => {
  const channel = activeChannelSignal.value;
  if (!channel) return 0;

  return onlineUsersSignal.value[channel.id] || 0;
});

export const currentChannelMessageCountSignal = computed(() => {
  return currentChannelMessagesSignal.value.length;
});

export const setActiveChannel = (channel: ChatChannel | null) => {
  activeChannelSignal.value = channel;

  if (channel && unreadCountSignal.value[channel.id]) {
    unreadCountSignal.value = {
      ...unreadCountSignal.value,
      [channel.id]: 0,
    };
  }
};

export const addChatMessage = (message: ChatMessage) => {
  const channelMessages = chatMessagesSignal.value[message.channelId] || [];

  chatMessagesSignal.value = {
    ...chatMessagesSignal.value,
    [message.channelId]: [...channelMessages, message],
  };

  const activeChannel = activeChannelSignal.value;
  if (!activeChannel || activeChannel.id !== message.channelId) {
    const currentUnread = unreadCountSignal.value[message.channelId] || 0;
    unreadCountSignal.value = {
      ...unreadCountSignal.value,
      [message.channelId]: currentUnread + 1,
    };
  }
};

export const deleteChatMessage = (channelId: string, messageId: string) => {
  const channelMessages = chatMessagesSignal.value[channelId] || [];

  chatMessagesSignal.value = {
    ...chatMessagesSignal.value,
    [channelId]: channelMessages.filter((m) => m.id !== messageId),
  };
};

export const clearChannelMessages = (channelId: string) => {
  chatMessagesSignal.value = {
    ...chatMessagesSignal.value,
    [channelId]: [],
  };
};

export const loadMockMessages = (
  channelId: string,
  channelType: ChatChannelType
) => {
  if (chatMessagesSignal.value[channelId]?.length > 0) {
    return;
  }

  const mockMessages: ChatMessage[] =
    channelType === "room"
      ? [
          {
            id: "1",
            channelId,
            channelType,
            userId: "user2",
            username: "AnnaWiśniewska",
            avatar: "A",
            content: "Hej! Ktoś obstawia dzisiejszy mecz?",
            timestamp: new Date(Date.now() - 180000).toISOString(),
          },
          {
            id: "2",
            channelId,
            channelType,
            userId: "user3",
            username: "PiotrNowak",
            avatar: "P",
            content: "Ja stawiłem na City 2:1",
            timestamp: new Date(Date.now() - 120000).toISOString(),
          },
          {
            id: "3",
            channelId,
            channelType,
            userId: "user4",
            username: "MariaKowalczyk",
            avatar: "M",
            content: "Liverpool wygra moim zdaniem",
            timestamp: new Date(Date.now() - 60000).toISOString(),
          },
        ]
      : [
          {
            id: "m1",
            channelId,
            channelType,
            userId: "user2",
            username: "AnnaWiśniewska",
            avatar: "A",
            content: "Co za mecz! Niesamowite tempo!",
            timestamp: new Date(Date.now() - 120000).toISOString(),
          },
          {
            id: "m2",
            channelId,
            channelType,
            userId: "user3",
            username: "PiotrNowak",
            avatar: "P",
            content: "Bramka! 1-0!",
            timestamp: new Date(Date.now() - 60000).toISOString(),
          },
        ];

  chatMessagesSignal.value = {
    ...chatMessagesSignal.value,
    [channelId]: mockMessages,
  };

  onlineUsersSignal.value = {
    ...onlineUsersSignal.value,
    [channelId]: Math.floor(Math.random() * 20) + 5,
  };
};

export const updateOnlineUsers = (channelId: string, count: number) => {
  onlineUsersSignal.value = {
    ...onlineUsersSignal.value,
    [channelId]: count,
  };
};

export const resetChatState = () => {
  chatMessagesSignal.value = {};
  unreadCountSignal.value = {};
  activeChannelSignal.value = null;
  onlineUsersSignal.value = {};
};
