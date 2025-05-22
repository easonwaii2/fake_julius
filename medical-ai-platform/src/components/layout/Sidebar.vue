<template>
  <aside class="sidebar-container">
    <div class="sidebar-content">
      <el-button type="primary" class="new-chat-btn" @click="startNewChat">
        New Chat
      </el-button>

      <div class="chat-history-section">
        <h3>Chat History</h3>
        <!-- Placeholder for chat history items -->
        <ul v-if="chatHistory.length > 0">
          <li v-for="item in chatHistory" :key="item.id">
            {{ item.title }}
          </li>
        </ul>
        <p v-else>No chat history yet.</p>
        <!-- Example static items -->
        <ul>
          <li>Chat 1</li>
          <li>Chat 2</li>
        </ul>
      </div>

      <div class="sidebar-footer">
        <router-link to="/profile" class="sidebar-link">
          User Account/Settings
        </router-link>
        <div class="sidebar-link" @click="handleFileManagement">
          File Management (Placeholder)
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElButton } from 'element-plus';

interface ChatHistoryItem {
  id: string;
  title: string;
}

const chatHistory = ref<ChatHistoryItem[]>([]);

const startNewChat = () => {
  console.log('Starting new chat...');
  // Logic to start a new chat will be added later
};

const handleFileManagement = () => {
  console.log('File management clicked...');
  // Logic for file management will be added later
};
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
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.new-chat-btn {
  width: 100%;
  margin-bottom: 20px;
}

.chat-history-section {
  margin-bottom: 20px;
  flex-grow: 1;
}

.chat-history-section h3 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}

.chat-history-section ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.chat-history-section li {
  padding: 8px 0;
  cursor: pointer;
  color: #555;
}

.chat-history-section li:hover {
  color: #007bff;
}

.sidebar-footer {
  margin-top: auto; /* Pushes footer to the bottom */
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.sidebar-link {
  display: block;
  padding: 10px 0;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.sidebar-link:hover {
  color: #007bff;
}
</style>
