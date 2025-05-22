import apiClient from './api';
import type { User } from '../interfaces'; // Adjust path if necessary, should be correct

export const login = async (credentials: { email: string, password: string }): Promise<User> => {
  console.log('Attempting login with:', credentials.email); // Avoid logging password directly
  // Simulate API call to POST /auth/login
  // In a real app: return apiClient.post('/auth/login', credentials).then(response => response.data);

  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Mock successful login
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    const mockUser: User = {
      id: '1', // Changed to string to match potential backend ID types
      username: 'Test User',
      email: 'test@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=test@example.com', // Example avatar
    };
    return mockUser;
  } else {
    // Simulate login failure
    throw new Error('Invalid credentials. Please try again.');
  }
};

// Optional: Mock register function
export const register = async (details: { username: string, email: string, password: string }): Promise<User> => {
  console.log('Attempting registration for:', details.email);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate successful registration
  if (details.email && details.password && details.username) {
    const mockUser: User = {
      id: Date.now().toString(), // Simple unique ID for mock
      username: details.username,
      email: details.email,
    };
    return mockUser;
  } else {
    throw new Error('Registration failed. Please provide all details.');
  }
};
