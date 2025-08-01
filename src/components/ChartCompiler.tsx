import React, { useState, useCallback } from 'react';
import { Copy, RotateCcw, ExternalLink, Save, Download, FileCode } from 'lucide-react';
import { ChartType } from '../types/chart';
import ChartRenderer from './ChartRenderer';
import EcoreConverter from './EcoreConverter';
import TabbedEditor from './TabbedEditor';
import { HybridStorage } from '../services/hybridStorage';
import { getTransformationTemplate } from '../data/transformationTemplates';

interface ChartCompilerProps {
  selectedChart: ChartType | null;
}

const defaultData = `[
  { "letter": "A", "frequency": 0.08167 },
  { "letter": "B", "frequency": 0.01492 },
  { "letter": "C", "frequency": 0.02782 },
  { "letter": "D", "frequency": 0.04253 },
  { "letter": "E", "frequency": 0.12702 }
]`;

const defaultTransformation = `function transformData(data) {
  // Default transformation logic
  console.log('Data:', data);
  return data;
}`;

const ChartCompiler: React.FC<ChartCompilerProps> = ({ selectedChart }) => {
  const [data, setData] = useState(defaultData);
  const [transformationLogic, setTransformationLogic] = useState(defaultTransformation);
  const [isExecuting, setIsExecuting] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [showEcoreConverter, setShowEcoreConverter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update data and transformation when chart selection changes
  React.useEffect(() => {
    const loadChartConfig = async () => {
      if (selectedChart) {
        setIsLoading(true);
        try {
          // Try to load saved configuration
          const savedData = await HybridStorage.loadCode(`${selectedChart.id}-data`);
          const savedTransformation = await HybridStorage.loadCode(`${selectedChart.id}-transformation`);
          
          if (savedData && savedTransformation) {
            setData(savedData);
            setTransformationLogic(savedTransformation);
          } else {
            // Load template for this chart type
            const template = getTransformationTemplate(selectedChart.id);
            if (template) {
              setData(template.defaultData);
              setTransformationLogic(template.transformationLogic);
            } else {
              setData(defaultData);
              setTransformationLogic(defaultTransformation);
            }
          }
        } catch (error) {
          console.error('Failed to load chart configuration:', error);
          setData(defaultData);
          setTransformationLogic(defaultTransformation);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadChartConfig();
  }, [selectedChart]);

  const handleSaveCode = useCallback(async () => {
    if (selectedChart) {
      try {
        await HybridStorage.saveCode(`${selectedChart.id}-data`, `${selectedChart.name} Data`, data);
        await HybridStorage.saveCode(`${selectedChart.id}-transformation`, `${selectedChart.name} Transformation`, transformationLogic);
        
        // Show success indicator
        const button = document.querySelector('[data-save-button]') as HTMLButtonElement;
        if (button) {
          const originalText = button.textContent;
          button.textContent = 'Saved!';
          button.style.backgroundColor = '#10b981';
          setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
          }, 1000);
        }
      } catch (error) {
        console.error('Failed to save configuration:', error);
        // Show error indicator
        const button = document.querySelector('[data-save-button]') as HTMLButtonElement;
        if (button) {
          const originalText = button.textContent;
          button.textContent = 'Error!';
          button.style.backgroundColor = '#ef4444';
          setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
          }, 1000);
        }
      }
    }
  }, [selectedChart, data, transformationLogic]);

  const handleExecute = useCallback(() => {
    setIsExecuting(true);
    
    try {
      // Parse the data
      const parsedData = JSON.parse(data);
      
      // Create the complete code by combining data and transformation
      const completeCode = `
        const data = ${data};
        ${transformationLogic}
        const chart = transformData(data);
      `;
      
      setGeneratedCode(completeCode);
    } catch (error) {
      console.error('Failed to execute transformation:', error);
      setGeneratedCode(`// Error: ${error.message}`);
    }
    
    // Simulate execution time
    setTimeout(() => setIsExecuting(false), 500);
  }, [data, transformationLogic]);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
  }, [generatedCode]);

  const handleCopyData = useCallback(() => {
    navigator.clipboard.writeText(data);
  }, [data]);

  const handleCopyTransformation = useCallback(() => {
    navigator.clipboard.writeText(transformationLogic);
  }, [transformationLogic]);

  const handleReset = useCallback(() => {
    if (selectedChart) {
      const template = getTransformationTemplate(selectedChart.id);
      if (template) {
        setData(template.defaultData);
        setTransformationLogic(template.transformationLogic);
      } else {
        setData(defaultData);
        setTransformationLogic(defaultTransformation);
      }
      HybridStorage.deleteCode(`${selectedChart.id}-data`);
      HybridStorage.deleteCode(`${selectedChart.id}-transformation`);
    }
  }, [selectedChart]);

  const handleDownloadCode = useCallback(() => {
    if (selectedChart) {
      const configData = {
        chartId: selectedChart.id,
        chartName: selectedChart.name,
        data: JSON.parse(data),
        transformationLogic: transformationLogic,
        generatedCode: generatedCode
      };
      
      const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedChart.id}-config.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [selectedChart, data, transformationLogic, generatedCode]);

  const handleOpenObservable = useCallback(() => {
    if (selectedChart) {
      window.open(`https://observablehq.com/${selectedChart.observableUrl}`, '_blank');
    }
  }, [selectedChart]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedChart ? selectedChart.name : 'Chart Compiler'} {isLoading && '(Loading...)'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedChart 
                ? selectedChart.description 
                : 'Select a chart type from the sidebar to get started'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedChart && (
              <button
                onClick={handleOpenObservable}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Observable
              </button>
            )}
            <button
              onClick={() => setShowEcoreConverter(!showEcoreConverter)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                showEcoreConverter 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <FileCode className="w-4 h-4" />
              Ecore
            </button>
            <button
              onClick={handleCopyCode}
              disabled={!generatedCode}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <Copy className="w-4 h-4" />
              Copy Generated
            </button>
            {selectedChart && (
              <>
                <button
                  onClick={handleSaveCode}
                  data-save-button
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleDownloadCode}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Split Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tabbed Editor */}
        <div className={`${showEcoreConverter ? 'w-1/3' : 'w-1/2'} border-r border-gray-200 flex flex-col`}>
          <div className="flex-1">
            <TabbedEditor
              data={data}
              transformationLogic={transformationLogic}
              onDataChange={setData}
              onTransformationChange={setTransformationLogic}
              onExecute={handleExecute}
              isExecuting={isExecuting}
            />
          </div>
        </div>

        {/* Ecore Converter */}
        {showEcoreConverter && (
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">D3 to Ecore Converter</h3>
              <p className="text-xs text-gray-500 mt-1">
                Convert D3 code to Ecore model representation
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              <EcoreConverter 
                d3Code={generatedCode} 
                chartName={selectedChart?.name || 'Chart'} 
              />
            </div>
          </div>
        )}

        {/* Chart Preview */}
        <div className={`${showEcoreConverter ? 'w-1/3' : 'w-1/2'} flex flex-col`}>
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Chart Preview</h3>
            <p className="text-xs text-gray-500 mt-1">
              Preview of the generated chart (click Execute to update)
            </p>
          </div>
          <div className="flex-1 p-6">
            <ChartRenderer code={generatedCode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCompiler;