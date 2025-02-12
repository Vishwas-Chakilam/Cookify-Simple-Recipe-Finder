import { STORAGE_KEYS, MAX_HISTORY_ITEMS } from './constants';

export const saveSearch = (query, mode = 'ingredients') => {
  const history = getSearchHistory();
  const newSearch = {
    id: Date.now(),
    date: new Date().toISOString(),
    query,
    mode
  };

  const updatedHistory = [newSearch, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));
  return newSearch;
};

export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading history:', error);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
};