export interface SavedChart {
  id: string;
  name: string;
  code: string;
  lastModified: string;
}

export class FileStorage {
  private static readonly CHARTS_DIR = '/saved-charts';

  // Save code to a JSON file
  static async saveCode(chartId: string, chartName: string, code: string): Promise<void> {
    try {
      const chart: SavedChart = {
        id: chartId,
        name: chartName,
        code: code,
        lastModified: new Date().toISOString()
      };

      const fileName = `${chartId}.json`;
      const filePath = `${this.CHARTS_DIR}/${fileName}`;
      
      // Create the saved-charts directory if it doesn't exist
      await this.ensureDirectoryExists();
      
      // Save as JSON file
      const response = await fetch('/api/save-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath,
          content: JSON.stringify(chart, null, 2)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save chart');
      }
    } catch (error) {
      console.error('Failed to save code to file:', error);
      throw error;
    }
  }

  // Load code from JSON file
  static async loadCode(chartId: string): Promise<string | null> {
    try {
      const fileName = `${chartId}.json`;
      const filePath = `${this.CHARTS_DIR}/${fileName}`;
      
      const response = await fetch(`/api/load-chart?path=${encodeURIComponent(filePath)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // File doesn't exist
        }
        throw new Error('Failed to load chart');
      }

      const chart: SavedChart = await response.json();
      return chart.code;
    } catch (error) {
      console.error('Failed to load code from file:', error);
      return null;
    }
  }

  // Get all saved charts
  static async getAllSavedCharts(): Promise<SavedChart[]> {
    try {
      const response = await fetch('/api/list-charts');
      
      if (!response.ok) {
        throw new Error('Failed to list charts');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get saved charts:', error);
      return [];
    }
  }

  // Delete a saved chart
  static async deleteCode(chartId: string): Promise<void> {
    try {
      const fileName = `${chartId}.json`;
      const filePath = `${this.CHARTS_DIR}/${fileName}`;
      
      const response = await fetch('/api/delete-chart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath })
      });

      if (!response.ok) {
        throw new Error('Failed to delete chart');
      }
    } catch (error) {
      console.error('Failed to delete code file:', error);
      throw error;
    }
  }

  private static async ensureDirectoryExists(): Promise<void> {
    try {
      await fetch('/api/ensure-directory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ directory: this.CHARTS_DIR })
      });
    } catch (error) {
      console.error('Failed to ensure directory exists:', error);
    }
  }
}