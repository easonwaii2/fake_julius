<template>
  <el-card class="markdown-renderer">
    <template #header>
      <div>
        <span>Markdown Content</span>
      </div>
    </template>
    <pre>{{ source }}</pre>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus';

interface Props {
  source: string;
}

defineProps<Props>();
</script>

<style scoped>
.markdown-renderer {
  margin-top: 10px;
  margin-bottom: 10px;
}
pre {
  white-space: pre-wrap; /* CSS property to wrap text */
  word-wrap: break-word; /* CSS property to break long words */
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 4px;
}
</style>
