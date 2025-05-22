<template>
  <div class="message-bubble-wrapper" :class="`sender-${chatMessage.sender}`">
    <el-card class="message-card" :body-style="{ padding: '10px 15px' }">
      <div class="message-content">
        <p>{{ chatMessage.text }}</p>
      </div>
      <DynamicTable
        v-if="chatMessage.metadata && chatMessage.metadata.table"
        :columns="chatMessage.metadata.table.columns"
        :data="chatMessage.metadata.table.rows"
        class="embedded-table"
      />
      <DynamicChart
        v-if="chatMessage.metadata && chatMessage.metadata.chart"
        :chart-options="chatMessage.metadata.chart"
        class="embedded-chart"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';
import type { ChatMessage } from '@/interfaces';
import DynamicTable from '@/components/common/DynamicTable.vue';
import DynamicChart from '@/components/common/DynamicChart.vue'; // Import DynamicChart

interface Props {
  chatMessage: ChatMessage;
}

defineProps<Props>();
</script>

<style scoped>
.message-bubble-wrapper {
  display: flex;
  margin-bottom: 10px;
  /* Max width should apply to the card, not the wrapper if table is wider */
}

.message-bubble-wrapper.sender-user {
  justify-content: flex-end;
  margin-left: auto;
}

.message-bubble-wrapper.sender-ai {
  justify-content: flex-start;
  margin-right: auto;
}

.message-card {
  border-radius: 15px;
  display: inline-block; /* Allows card to shrink to content or expand if table is wide */
  max-width: 70%; /* Max width for text messages */
  background-color: #f1f0f0; /* Default for AI */
}

.sender-user .message-card {
  background-color: #d9fdda;
}

.message-content p {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.embedded-table {
  margin-top: 10px;
  /* The table itself might need to break out of the max-width of the card
     if it's wider than the 70% text constraint. Or, the card's max-width
     should be adjusted when a table is present. For simplicity, let's
     assume the table will try to fit. If it's too wide, card will expand. */
  max-width: 100%; /* Allow table to use full width of the card */
}

.embedded-chart {
  margin-top: 10px;
  max-width: 100%; /* Allow chart to use full width of the card */
  /* ECharts component itself has min-height, ensure card can grow */
}
</style>
