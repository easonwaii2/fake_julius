<template>
  <div class="user-input-container">
    <el-input
      v-model="inputText"
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 6 }"
      placeholder="Type your message here..."
      class="input-textarea"
    />
    <el-button type="primary" @click="sendMessage" class="send-button">
      Send
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElInput, ElButton } from 'element-plus';

const inputText = ref('');

const sendMessage = () => {
  if (inputText.value.trim() === '') return;
  console.log('Sending message:', inputText.value);
  // Actual send logic will be implemented later
  inputText.value = ''; // Clear input after sending
};
</script>

<style scoped>
.user-input-container {
  display: flex;
  align-items: flex-end; /* Align items to bottom for textarea and button */
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #f9fafb;
}

.input-textarea {
  flex-grow: 1;
  margin-right: 10px;
}

.send-button {
  /* Adjust if necessary, ElButton has its own padding */
}
</style>
