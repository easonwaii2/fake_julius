<template>
  <div class="user-input-container">
    <el-input
      v-model="inputText"
      type="textarea"
      :autosize="{ minRows: 1, maxRows: 5 }"
      placeholder="Type your message here..."
      class="input-textarea"
      @keyup.enter.prevent="handleSendMessage"
      :disabled="chatStore.isAiTyping"
    />
    <el-button
      type="primary"
      @click="handleSendMessage"
      class="send-button"
      :disabled="chatStore.isAiTyping || inputText.trim() === ''"
    >
      Send
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton, ElMessage } from 'element-plus';
import { useChatStore } from '@/store/chatStore';
import { ChatMessage, MessageSender } from '@/interfaces';
import * as chatService from '@/services/chatService'; // Import chat service

const inputText = ref('');
const chatStore = useChatStore();

const handleSendMessage = async () => {
  const text = inputText.value.trim();
  if (text === '') return;

  if (!chatStore.currentConversationId) {
    ElMessage.error('Cannot send message: No active conversation.');
    return;
  }

  const userMessage: ChatMessage = {
    id: `user-${Date.now()}`,
    text: text,
    timestamp: new Date(),
    sender: MessageSender.User,
  };

  chatStore.addMessage(userMessage);
  inputText.value = ''; // Clear input

  // Trigger AI response simulation
  chatStore.setAiLoading(true);
  try {
    const aiResponse = await chatService.sendMessage(text); // Pass user message text to service
    chatStore.addMessage(aiResponse);
  } catch (error) {
    console.error("Error getting AI response:", error);
    ElMessage.error('Failed to get AI response.');
    // Optionally add an error message to the chat
    const errorResponseMessage: ChatMessage = {
      id: `error-${Date.now()}`,
      text: 'Sorry, I encountered an error trying to respond.',
      timestamp: new Date(),
      sender: MessageSender.AI,
      metadata: { error: true }
    };
    chatStore.addMessage(errorResponseMessage);
  } finally {
    chatStore.setAiLoading(false);
  }
};
</script>

<style scoped>
.user-input-container {
  display: flex;
  align-items: center; /* Align items vertically center */
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  background-color: #f9fafb;
}

.input-textarea {
  flex-grow: 1;
  margin-right: 10px;
}

.send-button {
  /* Adjust if necessary */
}
</style>
