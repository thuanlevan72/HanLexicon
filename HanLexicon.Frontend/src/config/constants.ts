/**
 * Application Constants
 * Store system-wide immutable values, configuration keys, and enum mappings here.
 */

export const CONFIG = {
  APP_NAME: 'MandarinFlow',
  VERSION: '1.0.0',
  DEFAULT_LANGUAGE: 'vi',
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    USER_PREFS: 'user_preferences',
    THEME: 'theme_choice'
  },
  
  // API Configurations
  API: {
    TIMEOUT_MS: 15000,
    DEFAULT_PAGE_LIMIT: 20
  }
} as const;

export const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student'
} as const;

export const HSK_LEVELS = [
  { id: 'HSK1', label: 'HSK 1', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'HSK2', label: 'HSK 2', color: 'bg-teal-100 text-teal-800' },
  { id: 'HSK3', label: 'HSK 3', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'HSK4', label: 'HSK 4', color: 'bg-blue-100 text-blue-800' },
  { id: 'HSK5', label: 'HSK 5', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'HSK6', label: 'HSK 6', color: 'bg-violet-100 text-violet-800' }
] as const;
