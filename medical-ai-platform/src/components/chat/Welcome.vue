<template>
  <div class="welcome-container">
    <el-card class="welcome-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Welcome to the Medical AI Platform!</span>
        </div>
      </template>
      <p>
        This platform is designed to assist medical professionals with AI-powered insights and tools.
      </p>
      <p>
        Click the "New Chat" button in the sidebar to start a new consultation or explore other features.
      </p>
      <el-divider />
      <h4>Quick Start:</h4>
      <ul>
        <li>Use the sidebar to navigate through chat history or start new sessions.</li>
        <li>Manage your account and settings via the link in the sidebar.</li>
      </ul>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard, ElDivider } from 'element-plus';
</script>

<style scoped>
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Make sure it takes full height of its parent */
  padding: 20px;
  background-color: #f9fafb; /* A light background for the page */
}

.welcome-card {
  max-width: 600px;
  width: 100%;
}

.card-header {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

p {
  line-height: 1.6;
  margin-bottom: 15px;
}

ul {
  list-style-position: inside;
  padding-left: 0;
}

li {
  margin-bottom: 8px;
}
</style>
