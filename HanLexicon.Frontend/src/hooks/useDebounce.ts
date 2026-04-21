import { useState, useEffect } from 'react';

/**
 * A generic hook to debounce fast-changing values (like Search Input).
 * Prevents rapid API calling on every keystroke.
 * 
 * @param value The value to debounce
 * @param delay Delay in ms (default: 500)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time useEffect is re-called.
    // This removes the previous timeout, ensuring that only the last value is set
    // when the user stops typing for the specified delay.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}
