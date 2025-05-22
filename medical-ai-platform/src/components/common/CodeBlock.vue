<template>
  <el-card class="code-block-container">
    <template #header>
      <div class="header-content">
        <span>Code Block{{ language ? `: ${language}` : '' }}</span>
        <el-button size="small" @click="copyCode">Copy</el-button>
      </div>
    </template>
    <pre><code :class="language ? `language-${language}` : ''">{{ code }}</code></pre>
  </el-card>
</template>

<script setup lang="ts">
import { ElButton, ElCard, ElMessage } from 'element-plus';

interface Props {
  code: string;
  language?: string;
}

const props = defineProps<Props>();

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    ElMessage({
      message: 'Code copied to clipboard!',
      type: 'success',
      duration: 2000,
    });
  } catch (err) {
    console.error('Failed to copy code: ', err);
    ElMessage({
      message: 'Failed to copy code.',
      type: 'error',
      duration: 2000,
    });
  }
};
</script>

<style scoped>
.code-block-container {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative; /* For positioning the copy button if needed differently */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

pre {
  background-color: #2d2d2d; /* Dark background for code */
  color: #f8f8f2; /* Light text color */
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto; /* Allow horizontal scrolling for long lines */
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

code {
  display: block; /* Ensure code block takes full width of pre */
}

/* Basic styling for potential future syntax highlighting (not implemented here) */
.language-python .token.keyword { color: #f92672; }
.language-javascript .token.keyword { color: #f92672; }
.language-sql .token.keyword { color: #f92672; }
/* Add more syntax highlight styles as needed */
</style>
