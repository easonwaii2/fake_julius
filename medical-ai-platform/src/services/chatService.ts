import apiClient from './api';
import type { ChatMessage, MessageSender } from '../interfaces'; // Adjust path if necessary

// Placeholder for sending a message and getting a mock AI response
export const sendMessage = async (messageText: string): Promise<ChatMessage> => {
  console.log('Sending message to mock API:', messageText);
  // Simulate API call to POST /chat/send
  // In a real app: return apiClient.post('/chat/send', { message: messageText }).then(response => response.data);

  await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate network delay

  if (messageText.toLowerCase().includes("show table")) {
    const tableResponse: ChatMessage = {
      id: `ai-table-${Date.now()}`,
      text: "Here is the user data you requested:",
      timestamp: new Date(),
      sender: MessageSender.AI,
      metadata: {
        table: {
          columns: [
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email Address' },
            { key: 'role', label: 'Role' },
          ],
          rows: [
            { id: 1, name: 'Alice Wonderland', email: 'alice@example.com', role: 'Admin' },
            { id: 2, name: 'Bob The Builder', email: 'bob@example.com', role: 'Editor' },
            { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
            { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor' },
          ],
        }
      }
    };
    return tableResponse;
  } else if (messageText.toLowerCase().includes("show chart") || messageText.toLowerCase().includes("visualize data")) {
    const chartResponse: ChatMessage = {
      id: `ai-chart-${Date.now()}`,
      text: "Okay, here is a chart visualization based on your request:",
      timestamp: new Date(),
      sender: MessageSender.AI,
      metadata: {
        chart: { // ECharts option object
          tooltip: {},
          legend: {
            data:['Patients']
          },
          xAxis: {
            data: ["Mon","Tue","Wed","Thu","Fri","Sat", "Sun"]
          },
          yAxis: {},
          series: [{
            name: 'Patients',
            type: 'line', // Example: line chart
            data: [12, 25, 10, 30, 22, 40, 35]
          }]
        }
      }
    };
    return chartResponse;
  } else {
    // Default mock response
    const defaultAiResponse: ChatMessage = {
      id: `ai-${Date.now()}`,
      text: `The AI has processed your message: "${messageText}". This is a mock response.`,
      timestamp: new Date(),
      sender: MessageSender.AI,
      metadata: {
        confidence: Math.random(),
        processingTime: Math.floor(Math.random() * 500) + 50,
      },
    };
    return defaultAiResponse;
  }
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
      sender: MessageSender.User, // Use enum directly
    },
    {
      id: `msg2-${chatId}`,
      text: 'And this is a past response from the AI.',
      timestamp: new Date(Date.now() - 3600000 * 1.9), // ~1.9 hours ago
      sender: MessageSender.AI, // Use enum directly
    },
  ];
  return mockHistory;
};
