import { defineStore } from 'pinia';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(credentials: any) {
      // Placeholder: In a real app, call an API, get a token, and user details
      console.log('Login credentials:', credentials);
      this.token = 'mock-jwt-token';
      this.isAuthenticated = true;
      this.user = { id: '1', name: 'Mock User', email: credentials.email || 'user@example.com' };
    },
    register(details: any) {
      // Placeholder: In a real app, call a registration API
      console.log('Registration details:', details);
      // Potentially log the user in directly after registration or require verification
    },
    logout() {
      this.token = null;
      this.isAuthenticated = false;
      this.user = null;
    },
  },
  getters: {
    isLoggedIn: (state): boolean => state.isAuthenticated,
    currentUser: (state): User | null => state.user,
  },
});
