"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  AuthState,
  AuthContextType,
  AuthAction,
  LoginCredentials,
} from "../types/auth";
import {
  validateCredentials,
  AUTH_STORAGE_KEYS,
} from "../lib/mockData/authMockData";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload.error,
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Mock Authentication Service
class MockAuthService {
  async login(
    credentials: LoginCredentials
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay for realistic experience
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const user = validateCredentials(
      credentials.username,
      credentials.password
    );

    if (user) {
      // Store in localStorage to persist session
      localStorage.setItem(
        AUTH_STORAGE_KEYS.TOKEN,
        "mock-jwt-token-" + Date.now()
      );
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));

      if (credentials.rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER_ME, "true");
      }

      return {
        success: true,
        user,
      };
    }

    return {
      success: false,
      error:
        "Invalid username or password. Try admin/admin123 or author/author123",
    };
  }

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Clear stored auth data
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
  }

  async checkAuthStatus(): Promise<User | null> {
    // Simulate checking stored token with slight delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        // Validate that the stored user is still active
        return user.isActive ? user : null;
      } catch {
        // Clear invalid data
        localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
      }
    }

    return null;
  }
}

const authService = new MockAuthService();

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      const result = await authService.login(credentials);

      if (result.success && result.user) {
        dispatch({ type: "AUTH_SUCCESS", payload: { user: result.user } });
      } else {
        dispatch({
          type: "AUTH_ERROR",
          payload: { error: result.error || "Login failed" },
        });
      }
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: { error: "Network error. Please try again." },
      });
    }
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: "AUTH_START" });

    try {
      await authService.logout();
      dispatch({ type: "AUTH_LOGOUT" });
    } catch (error) {
      // Even if logout fails on server, clear local state
      dispatch({ type: "AUTH_LOGOUT" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.checkAuthStatus();

        if (user) {
          dispatch({ type: "AUTH_SUCCESS", payload: { user } });
        } else {
          dispatch({ type: "AUTH_LOGOUT" });
        }
      } catch (error) {
        dispatch({ type: "AUTH_LOGOUT" });
      }
    };

    checkAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
