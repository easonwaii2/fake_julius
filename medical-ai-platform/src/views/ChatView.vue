<template>
  <div class="chat-view">
    <!-- Condition to show Welcome: No active conversation AND no messages in the potentially active (but empty) conversation AND AI is not typing -->
    <div v-if="!chatStore.currentConversationId && currentMessages.length === 0 && !isAiTyping" class="welcome-container">
      <Welcome />
    </div>
    <!-- Condition to show "This chat is empty": Active conversation selected, but it has no messages AND AI is not typing -->
    <div v-else-if="chatStore.currentConversationId && currentMessages.length === 0 && !isAiTyping" class="empty-chat-message">
      <p>This chat is empty. Send a message to start the conversation!</p>
    </div>
    <!-- Message List: Shown if there are messages OR if AI is typing (even if messages are not yet populated) -->
    <div v-else ref="messageListRef" class="message-list">
      <MessageBubble
        v-for="msg in currentMessages"
        :key="msg.id"
        :chat-message="msg"
      />
    </div>
    <div v-if="isAiTyping" class="ai-typing-indicator">
      AI is thinking... <el-icon class="is-loading"><Loading /></el-icon>
    </div>
    <UserInput />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick, watch } from 'vue';
import { useChatStore } from '@/store/chatStore';
import Welcome from '@/components/chat/Welcome.vue';
import MessageBubble from '@/components/chat/MessageBubble.vue';
import UserInput from '@/components/chat/UserInput.vue';
import { ElIcon } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';

const chatStore = useChatStore();

const currentMessages = computed(() => chatStore.getCurrentMessages);
const isAiTyping = computed(() => chatStore.isAiTyping);

const messageListRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  // Initialize chat history (mock load or from storage)
  chatStore.loadChatHistory(); // Ensure history is loaded or initialized

  if (!chatStore.currentConversationId && chatStore.getChatHistoryList.length > 0) {
    // Select the most recent chat if history exists and no current chat is active
    // Assuming getChatHistoryList is sorted with most recent first (as per store implementation)
    chatStore.selectConversation(chatStore.getChatHistoryList[0].id);
  } else if (!chatStore.currentConversationId) {
    // Start a new conversation if no history and no current chat
    chatStore.startNewConversation();
  }
  scrollToBottom();
});

watch(currentMessages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });

const scrollToBottom = () => {
  if (messageListRef.value) {
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight;
  }
};

</script>

<style scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100%; /* Occupy full height of its parent (main-content) */
  background-color: #fff;
}

.welcome-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
}

.empty-chat-message {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-style: italic;
}

.ai-typing-indicator {
  padding: 10px 15px;
  text-align: left;
  font-style: italic;
  color: #888;
  display: flex;
  align-items: center;
}

.ai-typing-indicator .el-icon {
  margin-left: 8px;
}
</style>
