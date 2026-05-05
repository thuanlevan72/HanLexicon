import { useState, useCallback } from 'react';
import { storage } from '@/src/utils/storage';

/**
 * A custom hook to interact with LocalStorage that triggers React renders.
 * 
 * @param key The local storage key
 * @param initialValue Fallback value if missing
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    return storage.get<T>(key, initialValue) as T;
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
          
        // Save state
        setStoredValue(valueToStore);
        
        // Save to local storage using util
        storage.set(key, valueToStore);
        } catch (error) {
        logger.warn(`Error setting localStorage key \"${key}\":`, error);
        }
        },
        [key, storedValue]
        );

  const removeValue = useCallback(() => {
    storage.remove(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}
