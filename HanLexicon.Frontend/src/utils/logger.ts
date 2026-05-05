/**
 * Centralized Logger Utility
 * Automatically disables logging in production for security and performance.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args);
    }
  },
  
  error: (message: string, error?: any) => {
    if (isDev) {
      // In dev, show full error
      console.error(`[ERROR] ${message}`, error);
    } else {
      // In production, log minimal info (e.g. to an external service if needed)
      // For now, just keep console clean
    }
  },
  
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args);
    }
  }
};
