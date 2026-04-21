import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

/**
 * Utility for formatting dates consistently across the app.
 */
export const dateUtils = {
  /**
   * Format generic Date/string objects to specified patterns.
   * Defaults to Vietnamese locale standard formatting.
   */
  formatDate: (dateInput: string | Date | number, pattern = 'dd/MM/yyyy'): string => {
    try {
      const date = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput);
      if (!isValid(date)) return '---';
      return format(date, pattern, { locale: vi });
    } catch {
      return '---';
    }
  },

  /**
   * Returns a relative time string (e.g., "5 minutes ago", "Vừa xong").
   */
  relativeTime: (dateInput: string | Date | number): string => {
    try {
      const date = typeof dateInput === 'string' ? parseISO(dateInput) : new Date(dateInput);
      if (!isValid(date)) return '---';
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch {
      return '---';
    }
  }
};

/**
 * Format system for text, numbers, and currency.
 */
export const formatUtils = {
  /**
   * Format numbers to local notation (e.g., 1000 -> 1.000).
   */
  number: (num: number, locale = 'vi-VN'): string => {
    return new Intl.NumberFormat(locale).format(num);
  },

  /**
   * Truncate long strings effectively adding ellipsis.
   */
  truncate: (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  },

  /**
   * Create URL safe slugs out of strings (useful for SEO friendly routes).
   */
  slugify: (text: string): string => {
    return text
      .toString()
      .normalize('NFD') // Unaccent
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  }
};
