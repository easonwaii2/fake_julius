import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ChatMessage, MessageSender } from '../interfaces';

export interface ChatHistoryEntry {
  id: string;
  title: string;
  lastActivity: Date;
}

export const useChatStore = defineStore('chat', () => {
  const conversations = ref<Record<string, ChatMessage[]>>({});
  const currentConversationId = ref<string | null>(null);
  const isLoadingAiResponse = ref(false);
  const chatHistory = ref<ChatHistoryEntry[]>([]);

  // Actions
  const startNewConversation = () => {
    const newId = Date.now().toString();
    currentConversationId.value = newId;
    conversations.value[newId] = [];
    chatHistory.value.unshift({ // Add to the beginning for most recent first
      id: newId,
      title: `Chat ${new Date(parseInt(newId)).toLocaleTimeString()}`, // Placeholder title
      lastActivity: new Date(),
    });
    isLoadingAiResponse.value = false;
  };

  const addMessage = (message: ChatMessage) => {
    if (currentConversationId.value) {
      if (!conversations.value[currentConversationId.value]) {
        // This case might happen if a conversation was in history but messages weren't loaded
        conversations.value[currentConversationId.value] = [];
      }
      conversations.value[currentConversationId.value].push(message);
      
      const historyEntry = chatHistory.value.find(h => h.id === currentConversationId.value);
      if (historyEntry) {
        historyEntry.lastActivity = new Date();
        // Update title with first user message (if it's the default title)
        const userMessages = conversations.value[currentConversationId.value].filter(m => m.sender === MessageSender.User);
        if (userMessages.length === 1 && historyEntry.title.startsWith('Chat ')) {
           historyEntry.title = userMessages[0].text.substring(0, 25) + (userMessages[0].text.length > 25 ? '...' : '');
        }
      }
    }
  };

  const selectConversation = (conversationId: string) => {
    if (conversations.value[conversationId]) { // Ensure conversation data exists or load it
        currentConversationId.value = conversationId;
        isLoadingAiResponse.value = false;
    } else {
        console.warn(`Conversation data for ${conversationId} not found. Implement loading logic if needed.`);
        // Potentially load conversation messages here if they are not kept in memory
        // For now, just select it if it's in history, assuming messages might be empty or loaded on demand
        currentConversationId.value = conversationId;
        conversations.value[conversationId] = []; // Initialize if not present
        isLoadingAiResponse.value = false;
    }
  };
  
  const setAiLoading = (isLoading: boolean) => {
    isLoadingAiResponse.value = isLoading;
  };

  // Mock action to load history (can be expanded later)
  const loadChatHistory = () => {
    // For now, it's a no-op. In a real app, this would fetch from localStorage or an API.
    // Example: Initialize with some mock data if chatHistory is empty
    if (chatHistory.value.length === 0) {
    //   const mockConvId1 = 'mock1';
    //   chatHistory.value.push({ id: mockConvId1, title: 'Past Chat 1', lastActivity: new Date(Date.now() - 3600000 * 2) });
    //   conversations.value[mockConvId1] = [
    //     { id: 'm1', text: 'Hello from past', sender: MessageSender.User, timestamp: new Date(Date.now() - 3600000 * 2) }
    //   ];
    //   const mockConvId2 = 'mock2';
    //   chatHistory.value.push({ id: mockConvId2, title: 'Another Old Chat', lastActivity: new Date(Date.now() - 3600000 * 5) });
    //   conversations.value[mockConvId2] = [
    //      { id: 'm2', text: 'More history', sender: MessageSender.User, timestamp: new Date(Date.now() - 3600000 * 5) }
    //   ];
    }
  };

  // Getters
  const getCurrentMessages = computed<ChatMessage[]>(() => {
    return currentConversationId.value ? conversations.value[currentConversationId.value] || [] : [];
  });
  const getChatHistoryList = computed<ChatHistoryEntry[]>(() => chatHistory.value);
  const isAiTyping = computed<boolean>(() => isLoadingAiResponse.value);

  return { 
    conversations, // Expose for direct access if needed, though getters are preferred
    currentConversationId, 
    isLoadingAiResponse, // Expose for direct binding if needed
    chatHistory, // Expose for direct binding if needed
    
    startNewConversation, 
    addMessage, 
    selectConversation,
    setAiLoading,
    loadChatHistory,
    
    getCurrentMessages, 
    getChatHistoryList, 
    isAiTyping 
  };
});
