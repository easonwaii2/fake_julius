export enum MessageSender {
  User = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: MessageSender;
  metadata?: Record<string, any>; // For things like chart data, table data, etc.
}
