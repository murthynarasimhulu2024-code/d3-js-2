import { FileStorage, SavedChart } from './fileStorage';
import { codeStorage } from './codeStorage';

export class HybridStorage {
  // Save code using file storage with localStorage fallback
  static async saveCode(chartId: string, chartName: string, code: string): Promise<void> {
    try {
      // Try to save to file first
      await FileStorage.saveCode(chartId, chartName, code);
      
      // Also save to localStorage as backup
      codeStorage.saveCode(chartId, code);
    } catch (error) {
      console.warn('File storage failed, using localStorage only:', error);
      // Fallback to localStorage only
      codeStorage.saveCode(chartId, code);
    }
  }

  // Load code from file storage with localStorage fallback
  static async loadCode(chartId: string): Promise<string | null> {
    try {
      // Try to load from file first
      const fileCode = await FileStorage.loadCode(chartId);
      if (fileCode) {
        return fileCode;
      }
    } catch (error) {
      console.warn('File storage load failed, trying localStorage:', error);
    }

    // Fallback to localStorage
    return codeStorage.getCode(chartId);
  }

  // Delete code from both storages
  static async deleteCode(chartId: string): Promise<void> {
    try {
      await FileStorage.deleteCode(chartId);
    } catch (error) {
      console.warn('File storage delete failed:', error);
    }
    
    // Always delete from localStorage
    codeStorage.deleteCode(chartId);
  }

  // Get all saved charts with hybrid approach
  static async getAllSavedCharts(): Promise<SavedChart[]> {
    try {
      return await FileStorage.getAllSavedCharts();
    } catch (error) {
      console.warn('File storage list failed, using localStorage:', error);
      
      // Fallback: convert localStorage data to SavedChart format
      const localCodes = codeStorage.getAllCodes();
      return Object.entries(localCodes).map(([id, code]) => ({
        id,
        name: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        code,
        lastModified: new Date().toISOString()
      }));
    }
  }
}