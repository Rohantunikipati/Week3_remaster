import React from 'react';
import { cn } from '../../utils/cn';
import Chart from 'react-apexcharts';
import { ChartData } from '../../types';
import useThemeStore from '../../store/themeStore';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: ChartData;
  type: 'line' | 'area' | 'bar';
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  subtitle, 
  data, 
  type = 'line', 
  height = 350 
}) => {
  const { darkMode } = useThemeStore();

  const chartOptions = {
    chart: {
      type,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#3b82f6', '#6366f1', '#10b981'],
    grid: {
      borderColor: darkMode ? '#374151' : '#e5e7eb',
      row: {
        colors: [darkMode ? '#1f2937' : '#f9fafb', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: data.categories,
      labels: {
        style: {
          colors: darkMode ? '#9ca3af' : '#6b7280',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? '#9ca3af' : '#6b7280',
        },
      },
    },
    tooltip: {
      theme: darkMode ? 'dark' : 'light',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: {
        colors: darkMode ? '#d1d5db' : '#4b5563',
      },
    },
    theme: {
      mode: darkMode ? 'dark' : 'light',
    },
  };

  return (
    <div className={cn(
      'bg-white dark:bg-card-dark rounded-card p-5',
      'shadow-card-light dark:shadow-card-dark',
      'border border-gray-100 dark:border-gray-800',
      'animate-fade-in'
    )}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
      
      <div className="w-full">
        <Chart 
          options={chartOptions as any} 
          series={data.series} 
          type={type} 
          height={height} 
        />
      </div>
    </div>
  );
};

export default ChartCard;