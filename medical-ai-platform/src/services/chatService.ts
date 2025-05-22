import apiClient from './api';
import type { ChatMessage, MessageSender } from '../interfaces'; // Adjust path if necessary

// Placeholder for sending a message and getting a mock AI response
export const sendMessage = async (messageText: string): Promise<ChatMessage> => {
  console.log('Sending message to mock API:', messageText);
  // Simulate API call to POST /chat/send
  // In a real app: return apiClient.post('/chat/send', { message: messageText }).then(response => response.data);

  await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay

  // Mock AI response
  const aiResponse: ChatMessage = {
    id: `ai-${Date.now()}`,
    text: `The AI has processed your message: "${messageText}". This is a mock response.`,
    timestamp: new Date(),
    sender: 'ai' as MessageSender, // Use enum from interface, cast if needed
    metadata: {
      confidence: Math.random(),
      processingTime: Math.floor(Math.random() * 500) + 50, // 50-550ms
    },
  };

  return aiResponse;
};

// Optional: Placeholder for fetching chat history
export const getChatHistory = async (chatId: string): Promise<ChatMessage[]> => {
  console.log('Fetching chat history for chat ID:', chatId);
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock chat history
  const mockHistory: ChatMessage[] = [
    {
      id: `msg1-${chatId}`,
      text: 'Hello, this is a past message from the user.',
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      sender: 'user' as MessageSender,
    },
    {
      id: `msg2-${chatId}`,
      text: 'And this is a past response from the AI.',
      timestamp: new Date(Date.now() - 3600000 * 1.9), // ~1.9 hours ago
      sender: 'ai' as MessageSender,
    },
  ];
  return mockHistory;
};
