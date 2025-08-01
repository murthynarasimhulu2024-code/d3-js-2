import { SavedChartCode } from '../types/chart';

const STORAGE_KEY = 'd3-chart-codes';

export const codeStorage = {
  // Save code for a specific chart
  saveCode: (chartId: string, code: string): void => {
    try {
      const savedCodes = codeStorage.getAllCodes();
      savedCodes[chartId] = code;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCodes));
    } catch (error) {
      console.error('Failed to save code:', error);
    }
  },

  // Get code for a specific chart
  getCode: (chartId: string): string | null => {
    try {
      const savedCodes = codeStorage.getAllCodes();
      return savedCodes[chartId] || null;
    } catch (error) {
      console.error('Failed to get code:', error);
      return null;
    }
  },

  // Get all saved codes
  getAllCodes: (): SavedChartCode => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to get all codes:', error);
      return {};
    }
  },

  // Delete code for a specific chart
  deleteCode: (chartId: string): void => {
    try {
      const savedCodes = codeStorage.getAllCodes();
      delete savedCodes[chartId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedCodes));
    } catch (error) {
      console.error('Failed to delete code:', error);
    }
  },

  // Clear all saved codes
  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear codes:', error);
    }
  }
};