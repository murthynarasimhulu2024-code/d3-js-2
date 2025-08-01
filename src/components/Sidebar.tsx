import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, BarChart3 } from 'lucide-react';
import { ChartType } from '../types/chart';
import { chartTypes, categories } from '../data/chartTypes';

interface SidebarProps {
  selectedChart: ChartType | null;
  onChartSelect: (chart: ChartType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedChart, onChartSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCharts = useMemo(() => {
    return chartTypes.filter(chart => {
      const matchesSearch = chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chart.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || chart.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const chartsByCategory = useMemo(() => {
    const grouped: Record<string, ChartType[]> = {};
    filteredCharts.forEach(chart => {
      if (!grouped[chart.category]) {
        grouped[chart.category] = [];
      }
      grouped[chart.category].push(chart);
    });
    return grouped;
  }, [filteredCharts]);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">D3 Charts</h1>
            <p className="text-sm text-gray-500">{chartTypes.length} chart types</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search charts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              !selectedCategory
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Chart List */}
      <div className="flex-1 overflow-y-auto">
        {Object.entries(chartsByCategory).map(([category, charts]) => (
          <div key={category} className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{category}</h3>
            <div className="space-y-1">
              {charts.map(chart => (
                <button
                  key={chart.id}
                  onClick={() => onChartSelect(chart)}
                  className={`w-full text-left p-3 rounded-lg transition-all group ${
                    selectedChart?.id === chart.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-medium truncate ${
                        selectedChart?.id === chart.id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {chart.name}
                      </h4>
                      <p className={`text-xs mt-1 line-clamp-2 ${
                        selectedChart?.id === chart.id ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {chart.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ml-2 transition-colors ${
                      selectedChart?.id === chart.id ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-500">
          {filteredCharts.length} of {chartTypes.length} charts shown
        </p>
      </div>
    </div>
  );
};

export default Sidebar;