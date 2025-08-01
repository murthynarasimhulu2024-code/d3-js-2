import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const CHARTS_DIR = path.join(process.cwd(), 'saved-charts');

// Ensure charts directory exists
async function ensureChartsDir() {
  try {
    await fs.access(CHARTS_DIR);
  } catch {
    await fs.mkdir(CHARTS_DIR, { recursive: true });
  }
}

// Save chart to file
app.post('/api/save-chart', async (req, res) => {
  try {
    const { filePath, content } = req.body;
    const fullPath = path.join(process.cwd(), filePath);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    await fs.writeFile(fullPath, content, 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving chart:', error);
    res.status(500).json({ error: 'Failed to save chart' });
  }
});

// Load chart from file
app.get('/api/load-chart', async (req, res) => {
  try {
    const { path: filePath } = req.query;
    const fullPath = path.join(process.cwd(), filePath);
    
    const content = await fs.readFile(fullPath, 'utf8');
    const chart = JSON.parse(content);
    res.json(chart);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Chart not found' });
    } else {
      console.error('Error loading chart:', error);
      res.status(500).json({ error: 'Failed to load chart' });
    }
  }
});

// List all saved charts
app.get('/api/list-charts', async (req, res) => {
  try {
    await ensureChartsDir();
    
    const files = await fs.readdir(CHARTS_DIR);
    const charts = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = await fs.readFile(path.join(CHARTS_DIR, file), 'utf8');
          const chart = JSON.parse(content);
          charts.push(chart);
        } catch (error) {
          console.error(`Error reading chart file ${file}:`, error);
        }
      }
    }
    
    res.json(charts);
  } catch (error) {
    console.error('Error listing charts:', error);
    res.status(500).json({ error: 'Failed to list charts' });
  }
});

// Delete chart file
app.delete('/api/delete-chart', async (req, res) => {
  try {
    const { filePath } = req.body;
    const fullPath = path.join(process.cwd(), filePath);
    
    await fs.unlink(fullPath);
    res.json({ success: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Chart not found' });
    } else {
      console.error('Error deleting chart:', error);
      res.status(500).json({ error: 'Failed to delete chart' });
    }
  }
});

// Ensure directory exists
app.post('/api/ensure-directory', async (req, res) => {
  try {
    const { directory } = req.body;
    const fullPath = path.join(process.cwd(), directory);
    
    await fs.mkdir(fullPath, { recursive: true });
    res.json({ success: true });
  } catch (error) {
    console.error('Error creating directory:', error);
    res.status(500).json({ error: 'Failed to create directory' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;