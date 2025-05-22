<template>
  <nav class="admin-navbar">
    <div class="navbar-brand">Admin Logo</div>
    <div class="navbar-menu">
      <div class="navbar-item">Admin Account</div>
      <el-button type="text" class="navbar-item" @click="logout">Logout</el-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push('/login'); // Redirect to login page after logout
};
</script>

<style scoped>
.admin-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #343a40; /* Dark background for navbar */
  color: #fff;
  border-bottom: 1px solid #444;
}

.navbar-brand {
  font-weight: bold;
  font-size: 1.2rem;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-item {
  margin-left: 20px;
  color: #fff;
  cursor: pointer;
}

.navbar-item.el-button { /* Specificity for Element Plus button */
  color: #fff;
}

.navbar-item.el-button:hover {
  color: #f0f0f0; /* Lighter color on hover */
}
</style>
