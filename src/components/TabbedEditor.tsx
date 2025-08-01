import React, { useState } from 'react';
import { Database, Code, Play } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface TabbedEditorProps {
  data: string;
  transformationLogic: string;
  onDataChange: (data: string) => void;
  onTransformationChange: (logic: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

const TabbedEditor: React.FC<TabbedEditorProps> = ({
  data,
  transformationLogic,
  onDataChange,
  onTransformationChange,
  onExecute,
  isExecuting
}) => {
  const [activeTab, setActiveTab] = useState<'data' | 'transformation'>('data');

  return (
    <div className="flex flex-col h-full">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'data'
              ? 'bg-white border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Database className="w-4 h-4" />
          Data Array
        </button>
        <button
          onClick={() => setActiveTab('transformation')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'transformation'
              ? 'bg-white border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Code className="w-4 h-4" />
          Transformation Logic
        </button>
        <div className="flex-1"></div>
        <button
          onClick={onExecute}
          disabled={isExecuting}
          className="flex items-center gap-2 px-4 py-2 m-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Play className="w-4 h-4" />
          {isExecuting ? 'Executing...' : 'Execute'}
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === 'data' && (
          <div className="h-full flex flex-col">
            <div className="p-3 bg-blue-50 border-b border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900">Data Array</h4>
              <p className="text-xs text-blue-700 mt-1">
                Define the data array that will be used by the chart. Use JSON format.
              </p>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="json"
                value={data}
                onChange={(value) => onDataChange(value || '')}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on',
                  formatOnPaste: true,
                  formatOnType: true
                }}
              />
            </div>
          </div>
        )}

        {activeTab === 'transformation' && (
          <div className="h-full flex flex-col">
            <div className="p-3 bg-green-50 border-b border-green-200">
              <h4 className="text-sm font-semibold text-green-900">Transformation Logic</h4>
              <p className="text-xs text-green-700 mt-1">
                Write the transformation function that converts data into chart options. Function should return chart configuration.
              </p>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={transformationLogic}
                onChange={(value) => onTransformationChange(value || '')}
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
        )}
      </div>
    </div>
  );
};

export default TabbedEditor;