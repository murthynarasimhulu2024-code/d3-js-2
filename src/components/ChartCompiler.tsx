import React, { useState, useCallback } from 'react';
import { Play, Copy, RotateCcw, ExternalLink, Save, Download, FileCode } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { ChartType } from '../types/chart';
import ChartRenderer from './ChartRenderer';
import EcoreConverter from './EcoreConverter';
import { codeStorage } from '../services/codeStorage';

interface ChartCompilerProps {
  selectedChart: ChartType | null;
}

const defaultBarChartCode = `// Simple Bar Chart
const width = 928;
const height = 500;
const marginTop = 30;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 40;

// Declare the x (horizontal position) scale.
const x = d3.scaleBand()
    .domain(d3.groupSort(data, ([d]) => -d.frequency, (d) => d.letter))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

// Declare the y (vertical position) scale.
const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.frequency)])
    .range([height - marginBottom, marginTop]);

// Create the SVG container.
const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

// Add a rect for each bar.
svg.append("g")
    .attr("fill", "steelblue")
  .selectAll()
  .data(data)
  .join("rect")
    .attr("x", (d) => x(d.letter))
    .attr("y", (d) => y(d.frequency))
    .attr("height", (d) => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

// Add the x-axis and label.
svg.append("g")
    .attr("transform", \`translate(0,\${height - marginBottom})\`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

// Add the y-axis and label.
svg.append("g")
    .attr("transform", \`translate(\${marginLeft},0)\`)
    .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Frequency (%)"));

// Return the chart
const chart = svg.node();`;

const ChartCompiler: React.FC<ChartCompilerProps> = ({ selectedChart }) => {
  const [code, setCode] = useState(() => {
    if (selectedChart) {
      const savedCode = codeStorage.getCode(selectedChart.id);
      return savedCode || defaultBarChartCode;
    }
    return defaultBarChartCode;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [showEcoreConverter, setShowEcoreConverter] = useState(false);

  // Update code when chart selection changes
  React.useEffect(() => {
    if (selectedChart) {
      const savedCode = codeStorage.getCode(selectedChart.id);
      if (savedCode) {
        setCode(savedCode);
      } else {
        // Set default code based on chart type
        setCode(getDefaultCodeForChart(selectedChart));
      }
    }
  }, [selectedChart]);

  const getDefaultCodeForChart = (chart: ChartType): string => {
    // Return chart-specific default code or the general default
    return defaultBarChartCode;
  };

  const handleRunCode = useCallback(() => {
    setIsRunning(true);
    // Simulate execution time
    setTimeout(() => setIsRunning(false), 500);
  }, []);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  const handleReset = useCallback(() => {
    if (selectedChart) {
      const defaultCode = getDefaultCodeForChart(selectedChart);
      setCode(defaultCode);
      codeStorage.deleteCode(selectedChart.id);
    }
  }, [selectedChart]);

  const handleSaveCode = useCallback(() => {
    if (selectedChart) {
      codeStorage.saveCode(selectedChart.id, code);
      // Show a brief success indicator
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
    }
  }, [selectedChart, code]);

  const handleDownloadCode = useCallback(() => {
    if (selectedChart) {
      const blob = new Blob([code], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedChart.id}.js`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [selectedChart, code]);

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
              {selectedChart ? selectedChart.name : 'Chart Compiler'}
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
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy
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
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>
      </div>

      {/* Split Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className={`${showEcoreConverter ? 'w-1/3' : 'w-1/2'} border-r border-gray-200 flex flex-col`}>
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Code Editor</h3>
            <p className="text-xs text-gray-500 mt-1">
              Edit the D3 code below. Available variables: d3, data
            </p>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on'
              }}
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
                d3Code={code} 
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
              Live preview of your D3 chart
            </p>
          </div>
          <div className="flex-1 p-6">
            <ChartRenderer code={code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartCompiler;