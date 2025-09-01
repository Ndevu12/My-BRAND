import { useState, useCallback } from 'react';
import { ValidationResult, ValidationRule, LoginCredentials, RegisterData } from '@/types/auth';

// Simplified validation rules - keeping only critical validations
export const authValidationRules = {
  username: [
    { required: true, message: 'Username is required' },
    { minLength: 3, message: 'Username must be at least 3 characters' },
  ],
  email: [
    { required: true, message: 'Email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' },
  ],
  password: [
    { required: true, message: 'Password is required' },
    { minLength: 4, message: 'Password must be at least 4 characters' },
  ],
  firstName: [
    { required: true, message: 'First name is required' },
    { minLength: 2, message: 'First name must be at least 2 characters' },
  ],
  lastName: [
    { required: true, message: 'Last name is required' },
    { minLength: 2, message: 'Last name must be at least 2 characters' },
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password' },
  ],
};

// Validation utility functions
export function isValidString(value: any): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateField(value: string, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    // Check if value is a valid string first
    if (!isValidString(value)) {
      if (rule.required) {
        return rule.message || 'This field is required';
      }
      continue;
    }

    if (rule.required && value.trim().length === 0) {
      return rule.message || 'This field is required';
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Must be less than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Invalid format';
    }
  }

  return null;
}

export function validateLoginForm(credentials: LoginCredentials): ValidationResult {
  const errors: Record<string, string> = {};

  const usernameError = validateField(credentials.username, authValidationRules.username);
  if (usernameError) errors.username = usernameError;

  const passwordError = validateField(credentials.password, authValidationRules.password);
  if (passwordError) errors.password = passwordError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateRegisterForm(userData: RegisterData): ValidationResult {
  const errors: Record<string, string> = {};

  const usernameError = validateField(userData.username, authValidationRules.username);
  if (usernameError) errors.username = usernameError;

  const emailError = validateField(userData.email, authValidationRules.email);
  if (emailError) errors.email = emailError;

  const passwordError = validateField(userData.password, authValidationRules.password);
  if (passwordError) errors.password = passwordError;

  const firstNameError = validateField(userData.firstName, authValidationRules.firstName);
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateField(userData.lastName, authValidationRules.lastName);
  if (lastNameError) errors.lastName = lastNameError;

  // Check password confirmation if provided
  if (userData.confirmPassword !== undefined) {
    const confirmPasswordError = validateField(userData.confirmPassword, authValidationRules.confirmPassword);
    if (confirmPasswordError) {
      errors.confirmPassword = confirmPasswordError;
    } else if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Custom hook for form validation
export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateForm = useCallback((data: any, validationType: 'login' | 'register'): ValidationResult => {
    setIsValidating(true);
    
    let result: ValidationResult;
    
    if (validationType === 'login') {
      result = validateLoginForm(data as LoginCredentials);
    } else {
      result = validateRegisterForm(data as RegisterData);
    }
    
    setErrors(result.errors);
    setIsValidating(false);
    
    return result;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  }, []);

  return {
    errors,
    isValidating,
    validateForm,
    clearErrors,
    clearFieldError,
    setFieldError,
  };
}

// Simple password validation for basic security (optional use)
export function isPasswordValid(password: string): {
  isValid: boolean;
  message?: string;
} {
  if (!isValidString(password)) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 4) {
    return { isValid: false, message: 'Password must be at least 4 characters' };
  }

  return { isValid: true };
}

// Form field state management
export function useFormField(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const onChange = useCallback((newValue: string) => {
    setValue(newValue);
    if (touched && error) {
      setError('');
    }
  }, [touched, error]);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const validate = useCallback((rules: ValidationRule[]) => {
    const validationError = validateField(value, rules);
    setError(validationError || '');
    return !validationError;
  }, [value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError('');
    setTouched(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    onChange,
    onBlur,
    validate,
    reset,
    hasError: touched && !!error,
  };
}

// Debounce hook for real-time validation
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useState(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedValue;
}

// Local storage utilities for auth
export const authStorage = {
  getUser: (): any | null => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: any): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_user', JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_remember_me');
  },

  getRememberMe: (): boolean => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('auth_remember_me') === 'true';
  },

  setRememberMe: (remember: boolean): void => {
    if (typeof window === 'undefined') return;
    if (remember) {
      localStorage.setItem('auth_remember_me', 'true');
    } else {
      localStorage.removeItem('auth_remember_me');
    }
  },
};

const authUtils = {
  validateField,
  validateLoginForm,
  validateRegisterForm,
  isPasswordValid,
  isValidString,
  authStorage,
};

export default authUtils;
