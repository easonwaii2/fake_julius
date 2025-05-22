<template>
  <aside class="admin-sidebar-container">
    <el-menu
      default-active="/admin"
      class="admin-sidebar-menu"
      router
    >
      <el-menu-item index="/admin">
        <el-icon><setting /></el-icon>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="/admin/users">
        <el-icon><user /></el-icon>
        <span>User Management</span>
      </el-menu-item>
      <!-- Optional Placeholder Links -->
      <el-menu-item index="/admin/models" disabled>
        <el-icon><cpu /></el-icon>
        <span>AI Model Management</span>
      </el-menu-item>
      <el-menu-item index="/admin/data" disabled>
        <el-icon><folder-opened /></el-icon>
        <span>Data Management</span>
      </el-menu-item>
      <el-menu-item index="/admin/settings" disabled>
        <el-icon><tools /></el-icon>
        <span>System Settings</span>
      </el-menu-item>
      <el-menu-item index="/admin/audit" disabled>
        <el-icon><document-checked /></el-icon>
        <span>Audit Log</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script setup lang="ts">
import {
  ElMenu,
  ElMenuItem,
  ElIcon,
} from 'element-plus';
import {
  Setting,
  User,
  Cpu,
  FolderOpened,
  Tools,
  DocumentChecked,
} from '@element-plus/icons-vue';
</script>

<style scoped>
.admin-sidebar-container {
  width: 240px; /* Adjust width as needed */
  background-color: #f8f9fa; /* Light background for sidebar */
  border-right: 1px solid #dee2e6; /* Border to separate from content */
  height: 100%; /* Full height */
}

.admin-sidebar-menu {
  border-right: none; /* ElMenu might add its own border */
  height: 100%;
}

.el-menu-item.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
