<template>
  <div class="message-bubble-wrapper" :class="`sender-${sender}`">
    <el-card class="message-card" :body-style="{ padding: '10px 15px' }">
      <div class="message-content">
        <p>{{ message }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';

interface Props {
  message: string;
  sender: 'user' | 'ai';
}

defineProps<Props>();
</script>

<style scoped>
.message-bubble-wrapper {
  display: flex;
  margin-bottom: 10px;
  max-width: 70%;
}

.message-bubble-wrapper.sender-user {
  justify-content: flex-end; /* Align user messages to the right */
  margin-left: auto; /* Push to the right */
}

.message-bubble-wrapper.sender-ai {
  justify-content: flex-start; /* Align AI messages to the left */
  margin-right: auto; /* Push to the left */
}

.message-card {
  border-radius: 15px;
  display: inline-block; /* Shrink to content */
}

.sender-user .message-card {
  background-color: #d9fdda; /* Light green for user messages */
}

.sender-ai .message-card {
  background-color: #f1f0f0; /* Light grey for AI messages */
}

.message-content p {
  margin: 0;
  white-space: pre-wrap; /* Preserve line breaks and spacing */
  word-wrap: break-word; /* Break long words */
}
</style>
