<template>
  <div class="app-layout">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue';
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}

/* Styles for Sidebar are now within Sidebar.vue */
/* No need for .sidebar class here anymore unless it's for positioning Sidebar itself */

.main-content {
  flex-grow: 1;
  /* padding: 20px; Ensure this padding doesn't conflict with ChatView's own layout */
  overflow-y: auto;
  display: flex; /* If main-content needs to flex its children (e.g. ChatView) */
  flex-direction: column; /* Make ChatView take full height */
}
</style>
