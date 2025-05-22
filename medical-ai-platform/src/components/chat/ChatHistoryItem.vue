<template>
  <li class="chat-history-item" @click="selectChat">
    <div class="item-content">
      <span class="chat-title">{{ title }}</span>
      <span v-if="lastActivity" class="last-activity">{{ lastActivity }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
interface Props {
  id: string; // Assuming each chat has a unique ID
  title: string;
  lastActivity?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(['select-chat']);

const selectChat = () => {
  emit('select-chat', props.id);
};
</script>

<style scoped>
.chat-history-item {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.chat-history-item:hover {
  background-color: #e9ecef;
}

.item-content {
  display: flex;
  flex-direction: column;
}

.chat-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 3px; /* Space between title and last activity */
}

.last-activity {
  font-size: 0.8rem;
  color: #777;
}
</style>
