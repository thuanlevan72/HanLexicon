/**
 * Core Application Types
 * Centralized location for generic API and Entity interfaces.
 */

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Global User interface for broader application state
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'teacher';
  avatarUrl?: string;
  isVerified: boolean;
}

export interface SortingOptions {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}
