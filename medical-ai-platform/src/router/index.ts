import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
// import HomePage from '@/views/HomePage.vue'; // No longer default
import ChatView from '@/views/ChatView.vue'; // New default
import AdminDashboardPage from '@/views/admin/AdminDashboardPage.vue';
import UserManagementPage from '@/views/admin/UserManagementPage.vue'; // Import new page
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import UserProfile from '@/views/user/UserProfile.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'Chat', // Or keep 'Home', or make more generic like 'AppDefault'
        component: ChatView,
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboardPage,
      },
      {
        path: 'users',
        name: 'AdminUserManagement',
        component: UserManagementPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
