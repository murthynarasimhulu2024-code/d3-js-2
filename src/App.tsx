import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChartCompiler from './components/ChartCompiler';
import { ChartType } from './types/chart';

function App() {
  const [selectedChart, setSelectedChart] = useState<ChartType | null>(null);

  return (
    <div className="h-screen bg-gray-100 flex">
      <Sidebar 
        selectedChart={selectedChart} 
        onChartSelect={setSelectedChart} 
      />
      <ChartCompiler selectedChart={selectedChart} />
    </div>
  );
}

export default App;