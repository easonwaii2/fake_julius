<template>
  <li
    class="chat-history-item"
    :class="{ 'active': isActive }"
    @click="handleSelectChat"
  >
    <div class="item-content">
      <span class="chat-title" :title="title">{{ truncatedTitle }}</span>
      <span v-if="lastActivity" class="last-activity">
        {{ formattedLastActivity }}
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  id: string;
  title: string;
  lastActivity: Date; // Expecting Date object
  isActive: boolean;
}>();

const emit = defineEmits(['select-chat']);

const handleSelectChat = () => {
  emit('select-chat', props.id);
};

const formattedLastActivity = computed(() => {
  if (!props.lastActivity) return '';
  // Simple date formatting, can be replaced with a library like date-fns
  const date = new Date(props.lastActivity); // Ensure it's a Date object
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
});

const truncatedTitle = computed(() => {
  const maxLength = 30; // Max characters for title in sidebar
  if (props.title.length > maxLength) {
    return props.title.substring(0, maxLength) + '...';
  }
  return props.title;
});
</script>

<style scoped>
.chat-history-item {
  padding: 8px 10px; /* Slightly reduced padding */
  cursor: pointer;
  border-bottom: 1px solid #e9edf0; /* Lighter border */
  transition: background-color 0.2s ease;
  border-radius: 4px; /* Add some rounding */
  margin-bottom: 3px; /* Space between items */
}

.chat-history-item:hover {
  background-color: #e9ecef;
}

.chat-history-item.active {
  background-color: #007bff; /* Element Plus primary blue */
  color: #fff;
}

.chat-history-item.active .chat-title,
.chat-history-item.active .last-activity {
  color: #fff; /* Ensure text is white on active background */
}

.item-content {
  display: flex;
  flex-direction: column;
}

.chat-title {
  font-weight: 500;
  font-size: 0.85rem; /* Slightly smaller title */
  color: #333;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.last-activity {
  font-size: 0.75rem; /* Smaller activity text */
  color: #777;
}
</style>
