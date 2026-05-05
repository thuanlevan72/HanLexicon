import { logger } from '@/src/utils/logger';

/**
 * Type-safe LocalStorage wrappers to avoid direct manipulation errors.
 */

export const storage = {
  /**
   * Safe setItem for parsing JSON.
   */
  set: <T>(key: string, value: T): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      logger.warn(`Error setting localStorage key \"${key}\":`, error);
    }
  },

  /**
   * Safe getItem returning generic types.
   */
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? (JSON.parse(item) as T) : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      logger.warn(`Error getting localStorage key \"${key}\":`, error);
      return defaultValue;
    }
  },

  /**
   * Remove item safely.
   */
  remove: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      logger.warn(`Error removing localStorage key \"${key}\":`, error);
    }
  },

  /**
   * Clear fully.
   */
  clear: (): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.clear();
      }
    } catch (error) {
      logger.warn('Error clearing localStorage:', error);
    }
  }
};
