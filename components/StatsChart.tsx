import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { LucideIcon } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StatsChartProps {
  data: {
    date: string;
    duration: number;
  }[];
}

const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Meditation Duration (minutes)',
        data: data.map(entry => entry.duration),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Meditation Stats Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Meditation Statistics</h2>
      <Bar data={chartData} options={options} aria-label="Meditation statistics chart" role="img" />
      <div className="flex justify-center mt-4">
        <LucideIcon name="bar-chart" className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
};

export default StatsChart;