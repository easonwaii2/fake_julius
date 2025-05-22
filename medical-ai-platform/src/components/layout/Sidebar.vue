<template>
  <aside class="sidebar-container">
    <div class="sidebar-content">
      <el-button type="primary" class="new-chat-btn" @click="handleStartNewChat">
        <el-icon class="el-icon--left"><Plus /></el-icon>
        New Chat
      </el-button>

      <div class="chat-history-section">
        <h3>Chat History</h3>
        <el-scrollbar class="history-scrollbar">
          <ul v-if="chatHistoryList.length > 0" class="chat-history-list">
            <ChatHistoryItem
              v-for="item in chatHistoryList"
              :key="item.id"
              :id="item.id"
              :title="item.title"
              :lastActivity="item.lastActivity"
              :isActive="item.id === currentConversationId"
              @select-chat="handleSelectConversation"
            />
          </ul>
          <p v-else class="no-history-text">No chat history yet.</p>
        </el-scrollbar>
      </div>

      <div class="sidebar-footer">
        <router-link to="/profile" class="sidebar-link">
          <el-icon class="el-icon--left"><User /></el-icon>
          User Account
        </router-link>
        <div class="sidebar-link" @click="handleFileManagement">
          <el-icon class="el-icon--left"><Folder /></el-icon>
          File Management
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { ElButton, ElScrollbar, ElIcon } from 'element-plus';
import { Plus, User, Folder } from '@element-plus/icons-vue';
import { useChatStore } from '@/store/chatStore';
import ChatHistoryItem from '@/components/chat/ChatHistoryItem.vue';

const chatStore = useChatStore();

const chatHistoryList = computed(() => chatStore.getChatHistoryList);
const currentConversationId = computed(() => chatStore.currentConversationId);

const handleStartNewChat = () => {
  chatStore.startNewConversation();
};

const handleSelectConversation = (conversationId: string) => {
  chatStore.selectConversation(conversationId);
};

const handleFileManagement = () => {
  console.log('File management clicked (placeholder)...');
  // Logic for file management will be added later
};

onMounted(() => {
  chatStore.loadChatHistory(); // Load history if any (currently a no-op or mock initializer)
});
</script>

<style scoped>
.sidebar-container {
  width: 260px;
  background-color: #f4f6f8;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-content {
  padding: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensure scrollbar is contained */
}

.new-chat-btn {
  width: 100%;
  margin-bottom: 15px;
}

.chat-history-section {
  margin-bottom: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* For scrollbar content */
}

.chat-history-section h3 {
  font-size: 0.9rem; /* Slightly smaller */
  color: #555;
  margin-bottom: 8px;
  padding-left: 5px;
}

.history-scrollbar {
  flex-grow: 1;
}

.chat-history-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.no-history-text {
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  padding: 10px;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.sidebar-link {
  display: flex; /* Use flex for icon alignment */
  align-items: center;
  padding: 10px 5px;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 4px;
}

.sidebar-link:hover {
  background-color: #e9ecef;
  color: #007bff;
}

.sidebar-link .el-icon {
  margin-right: 8px;
}
</style>
