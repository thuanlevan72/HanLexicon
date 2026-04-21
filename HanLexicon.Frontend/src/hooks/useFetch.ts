import { useState, useCallback } from 'react';
import { apiClient } from '@/src/services/apiClient';
import { AxiosRequestConfig } from 'axios';

interface UseFetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * A generic hook to encapsulate Axios calls with loading and error states.
 * Best used for initial data fetching where React-Query isn't available.
 */
export function useFetch<T>() {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const executeFetch = useCallback(async (
    url: string,
    options?: AxiosRequestConfig
  ): Promise<T | null> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await apiClient.request<T>({
        url,
        ...options,
      });
      
      setState({
        data: response.data,
        isLoading: false,
        error: null,
      });
      
      return response.data;
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return {
    ...state,
    executeFetch,
    reset
  };
}
