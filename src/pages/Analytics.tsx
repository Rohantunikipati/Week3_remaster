import React from 'react';
import ChartCard from '../components/dashboard/ChartCard';
import AnalyticCard from '../components/analytics/AnalyticCard';
import { mockRevenueData, mockUsersData } from '../data/mockData';

const Analytics: React.FC = () => {
  // Sample analytics data
  const analyticsCards = [
    { title: 'Total Sales', value: '$124,563', trend: 12.5, icon: 'DollarSign', description: 'vs last month', color: 'primary' },
    { title: 'Conversion Rate', value: '3.42%', trend: 0.8, icon: 'BarChart2', description: 'vs last month', color: 'accent' },
    { title: 'Avg. Order Value', value: '$78.32', trend: -2.3, icon: 'ShoppingCart', description: 'vs last month', color: 'secondary' },
    { title: 'Active Users', value: '13,842', trend: 5.1, icon: 'Users', description: 'vs last month', color: 'success' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <div className="flex items-center space-x-3">
          <select
            className="py-2 px-3 bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last 12 Months</option>
            <option>Year to Date</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
            Export
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card) => (
          <AnalyticCard
            key={card.title}
            title={card.title}
            value={card.value}
            trend={card.trend}
            icon={card.icon}
            description={card.description}
            color={card.color}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue Trends"
          subtitle="Monthly revenue and expenses (Last 12 months)"
          data={mockRevenueData}
          type="area"
        />
        <ChartCard
          title="User Acquisition"
          subtitle="New vs. active users (Last 6 months)"
          data={mockUsersData}
          type="bar"
        />
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-card-dark rounded-card p-5 shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: 'Direct', value: 42, color: 'primary-500' },
              { source: 'Organic Search', value: 28, color: 'secondary-500' },
              { source: 'Referral', value: 16, color: 'accent-500' },
              { source: 'Social Media', value: 14, color: 'warning-500' },
            ].map((item) => (
              <div key={item.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.source}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`rounded-full h-2 bg-${item.color}`} 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-card-dark rounded-card p-5 shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Distribution</h2>
          <div className="flex flex-col h-[calc(100%-2rem)] justify-center items-center">
            <div className="relative h-48 w-48">
              {/* This would be a pie chart in a real implementation */}
              <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700 border-8 border-primary-500 opacity-25" />
              <div className="absolute inset-0 rounded-full border-8 border-primary-500 animate-spin" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)' }} />
              
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-xl font-bold text-gray-900 dark:text-white">68%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Mobile</div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-around w-full">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 dark:text-white">22%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Desktop</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 dark:text-white">10%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Tablet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;