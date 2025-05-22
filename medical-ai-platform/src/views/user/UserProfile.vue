<template>
  <div>
    <h1>User Profile Page</h1>
    <p v-if="authStore.isAuthenticated && authStore.user">
      Welcome, {{ authStore.user.name }}!
    </p>
    <p v-else>
      Please log in to see your profile.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'; // Assuming authStore will be created here

const authStore = useAuthStore();
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 30px;
}
p {
  text-align: center;
}
</style>
