import { useEffect } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  setActiveChannel,
  addChatMessage,
  deleteChatMessage,
  currentChannelMessagesSignal,
  currentChannelOnlineUsersSignal,
  loadMockMessages,
} from "../signals/chat.signals";
import type { ChatChannel, ChatMessage } from "../types/types";

interface UseChatReturn {
  messages: ChatMessage[];
  onlineUsers: number;
  sendMessage: (content: string, userId: string, username: string) => void;
  deleteMessage: (messageId: string) => void;
  isLoading: boolean;
}

export const useChat = (channel: ChatChannel): UseChatReturn => {
  useSignals();

  useEffect(() => {
    setActiveChannel(channel);

    loadMockMessages(channel.id, channel.type);

    return () => {
      setActiveChannel(null);
    };
  }, [channel.id, channel.type]);

  const sendMessage = (content: string, userId: string, username: string) => {
    if (!content.trim()) return;

    const message: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      channelId: channel.id,
      channelType: channel.type,
      userId,
      username,
      avatar: username[0]?.toUpperCase() || "U",
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    addChatMessage(message);

    console.log("📤 Sending message via SignalR (TODO):", message);
  };

  const deleteMessage = (messageId: string) => {
    deleteChatMessage(channel.id, messageId);

    console.log("🗑️ Deleting message via API (TODO):", messageId);
  };

  return {
    messages: currentChannelMessagesSignal.value,
    onlineUsers: currentChannelOnlineUsersSignal.value,
    sendMessage,
    deleteMessage,
    isLoading: false,
  };
};
