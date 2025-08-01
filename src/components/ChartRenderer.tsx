import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ChartRendererProps {
  code: string;
  data?: any[];
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ code, data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !code.trim()) return;

    // Clear previous chart
    d3.select(containerRef.current).selectAll('*').remove();

    try {
      // Create a default dataset if none provided
      const defaultData = data || [
        {letter: 'A', frequency: 0.08167},
        {letter: 'B', frequency: 0.01492},
        {letter: 'C', frequency: 0.02782},
        {letter: 'D', frequency: 0.04253},
        {letter: 'E', frequency: 0.12702},
        {letter: 'F', frequency: 0.02288},
        {letter: 'G', frequency: 0.02015},
        {letter: 'H', frequency: 0.06094},
        {letter: 'I', frequency: 0.06966},
        {letter: 'J', frequency: 0.00153}
      ];

      // Create a safe execution environment
      const chartFunction = new Function('d3', 'data', `
        ${code}
        return chart;
      `);

      const chart = chartFunction(d3, defaultData);
      
      if (chart && containerRef.current) {
        containerRef.current.appendChild(chart);
      }
    } catch (error) {
      console.error('Chart rendering error:', error);
      if (containerRef.current) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'p-4 text-red-600 text-sm bg-red-50 rounded-lg';
        errorDiv.textContent = `Error rendering chart: ${error.message}`;
        containerRef.current.appendChild(errorDiv);
      }
    }
  }, [code, data]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg"
      style={{ minHeight: '400px' }}
    />
  );
};

export default ChartRenderer;