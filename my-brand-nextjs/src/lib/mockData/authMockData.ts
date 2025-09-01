import { User } from '../../types/auth';

/**
 * Centralized mock user data for consistent authentication experience
 * This data is shared across all auth components and services
 */
export const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@mybrand.com',
    firstName: 'Your',
    lastName: 'Name',
    avatar: '/images/anonymous.png',
    bio: 'Website Owner & Content Creator - Managing My Brand platform and creating all blog content.',
    isActive: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Default admin credentials for demo purposes
 */
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};


/**
 * Storage keys for localStorage persistence
 */
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'my-brand-auth-token',
  USER: 'my-brand-user-data',
  REMEMBER_ME: 'my-brand-remember-me',
} as const;

/**
 * Demo login hint for testing (simplified credentials)
 */
export const DEMO_LOGIN_HINTS = [
  {
    label: 'Admin/Owner Access',
    username: ADMIN_CREDENTIALS.username,
    password: ADMIN_CREDENTIALS.password,
    description: 'Full access to dashboard, content management, and blog authoring'
  }
];

/**
 * Get user by username for authentication
 */
export function getUserByUsername(username: string): User | undefined {
  return MOCK_USERS.find(user => user.username === username);
}

/**
 * Get user by ID
 */
export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find(user => user.id === id);
}

/**
 * Validate user credentials for single-user system
 */
export function validateCredentials(username: string, password: string): User | null {
  const user = getUserByUsername(username);
  
  if (!user || !user.isActive) {
    return null;
  }

  // Check password for admin user (who is also the content author)
  const isValidPassword = 
    (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password);

  return isValidPassword ? user : null;
}
