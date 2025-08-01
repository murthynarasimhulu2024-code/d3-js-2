import React, { useState, useMemo } from 'react';
import { Download, Copy, RefreshCw } from 'lucide-react';
import { EcoreConverter as EcoreService } from '../services/ecoreConverter';

interface EcoreConverterProps {
  d3Code: string;
  chartName: string;
}

const EcoreConverter: React.FC<EcoreConverterProps> = ({ d3Code, chartName }) => {
  const [outputFormat, setOutputFormat] = useState<'json' | 'xml'>('json');
  const [isConverting, setIsConverting] = useState(false);

  const ecoreModel = useMemo(() => {
    if (!d3Code.trim()) return null;
    
    try {
      return EcoreService.convertD3ToEcore(d3Code, chartName);
    } catch (error) {
      console.error('Conversion error:', error);
      return null;
    }
  }, [d3Code, chartName]);

  const formattedOutput = useMemo(() => {
    if (!ecoreModel) return '';
    
    try {
      return outputFormat === 'json' 
        ? EcoreService.ecoreToJson(ecoreModel)
        : EcoreService.ecoreToXml(ecoreModel);
    } catch (error) {
      return `Error formatting output: ${error.message}`;
    }
  }, [ecoreModel, outputFormat]);

  const handleConvert = () => {
    setIsConverting(true);
    // Simulate conversion time
    setTimeout(() => setIsConverting(false), 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedOutput);
  };

  const handleDownload = () => {
    const extension = outputFormat === 'json' ? 'json' : 'xml';
    const mimeType = outputFormat === 'json' ? 'application/json' : 'application/xml';
    
    const blob = new Blob([formattedOutput], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chartName.replace(/\s+/g, '_')}_ecore.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-700">Format:</label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as 'json' | 'xml')}
              className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="json">JSON</option>
              <option value="xml">XML</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isConverting ? 'animate-spin' : ''}`} />
              Convert
            </button>
            <button
              onClick={handleCopy}
              disabled={!formattedOutput}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors disabled:opacity-50"
            >
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button
              onClick={handleDownload}
              disabled={!formattedOutput}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded transition-colors disabled:opacity-50"
            >
              <Download className="w-3 h-3" />
              Save
            </button>
          </div>
        </div>

        {/* Model Summary */}
        {ecoreModel && (
          <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
            <div className="font-medium mb-1">Model: {ecoreModel.name}</div>
            <div>Elements: {ecoreModel.elements.length}</div>
          </div>
        )}
      </div>

      {/* Output */}
      <div className="flex-1 overflow-auto">
        {formattedOutput ? (
          <pre className="text-xs font-mono p-4 h-full overflow-auto bg-gray-50 text-gray-800 whitespace-pre-wrap">
            {formattedOutput}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            {d3Code.trim() ? 'Converting...' : 'Enter D3 code to convert'}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoreConverter;