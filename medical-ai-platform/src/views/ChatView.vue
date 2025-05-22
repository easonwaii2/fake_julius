<template>
  <div class="chat-view-container">
    <!-- Conditionally display Welcome.vue or the actual chat interface -->
    <Welcome v-if="!isChatActive" />
    <div v-else class="chat-interface">
      <div class="message-list-container">
        <!-- Placeholder for MessageBubble components -->
        <p>Chat messages will appear here.</p>
      </div>
      <UserInput />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Welcome from '@/components/chat/Welcome.vue';
import UserInput from '@/components/chat/UserInput.vue'; // Will be created next

// This ref will determine whether to show Welcome.vue or the chat interface
// For now, it's true to show Welcome.vue by default.
// Later, this will be controlled by whether a chat is selected/active.
const isChatActive = ref(false); // Set to false to show Welcome by default
</script>

<style scoped>
.chat-view-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Take full height of the main content area */
  width: 100%;
  background-color: #fff;
}

.chat-interface {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%; /* Ensure it takes full height of chat-view-container if active */
}

.message-list-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0; /* Separator from UserInput */
}
</style>
