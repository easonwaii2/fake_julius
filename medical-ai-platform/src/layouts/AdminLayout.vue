<template>
  <div class="admin-layout">
    <AdminNavbar />
    <div class="admin-body">
      <AdminSidebar />
      <main class="admin-main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminNavbar from '@/components/admin/layout/AdminNavbar.vue';
import AdminSidebar from '@/components/admin/layout/AdminSidebar.vue';
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; /* Prevent scrollbars on the layout itself */
}

/* AdminNavbar styles are within its own component */

.admin-body {
  display: flex;
  flex-grow: 1;
  overflow-y: auto; /* Allow scroll on body if content overflows */
}

/* AdminSidebar styles are within its own component */

.admin-main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto; /* Allow scroll on main content area */
  background-color: #fff; /* Background for the content area */
}
</style>
