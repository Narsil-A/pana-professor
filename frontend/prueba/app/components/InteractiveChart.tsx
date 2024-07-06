'use client';

import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Import necessary modules from chart.js in a modular approach
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Define the interface for the props that the InteractiveChart component will receive
interface ChartProps {
  data: ChartData<'bar' | 'line' | 'pie'>;
  options: ChartOptions<'bar' | 'line' | 'pie'>;
  type: 'bar' | 'line' | 'pie';
  width?: string;
  height?: string;
}

// InteractiveChart component definition
const InteractiveChart: React.FC<ChartProps> = ({ data, options, type, width = '600px', height = '400px' }) => {
  // State to manage the current chart type
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>(type);

  // Effect to update the chart type when the 'type' prop changes
  useEffect(() => {
    setChartType(type);
  }, [type]);

  // Function to render the appropriate chart based on the current chart type
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={data as ChartData<'bar'>} options={options as ChartOptions<'bar'>} />;
      case 'line':
        return <Line data={data as ChartData<'line'>} options={options as ChartOptions<'line'>} />;
      case 'pie':
        return <Pie data={data as ChartData<'pie'>} options={options as ChartOptions<'pie'>} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Button group to change chart type */}
      <div className="mb-5 flex space-x-2">
        <button 
          onClick={() => setChartType('bar')} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200"
        >
          Bar
        </button>
        <button 
          onClick={() => setChartType('line')} 
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
        >
          Line
        </button>
        <button 
          onClick={() => setChartType('pie')} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200"
        >
          Pie
        </button>
      </div>
      {/* Container for the chart */}
      <div style={{ width, height }} className="p-4">
        {renderChart()}
      </div>
    </div>
  );
};

export default InteractiveChart;






