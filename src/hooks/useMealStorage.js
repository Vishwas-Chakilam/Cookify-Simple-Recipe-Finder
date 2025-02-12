import { useState, useEffect } from 'react';

const STORAGE_KEY = 'meal_form_data';

export const useMealStorage = (initialState) => {
  // Load initial state from localStorage if available
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};