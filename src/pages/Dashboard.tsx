import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import { mockStats, mockRevenueData, mockUsersData } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue Overview"
          subtitle="Monthly revenue and expenses"
          data={mockRevenueData}
          type="area"
        />
        <ChartCard
          title="User Growth"
          subtitle="New vs. active users"
          data={mockUsersData}
          type="bar"
        />
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-card-dark rounded-card p-5 shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
              >
                <div className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full p-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {i % 2 === 0 ? '📊' : '📝'}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">
                    {i % 2 === 0 
                      ? 'Sales report generated' 
                      : 'New customer registered'}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {i % 2 === 0 
                      ? 'The monthly sales report was generated successfully' 
                      : 'A new customer account was created'}
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    {i === 1 ? '2 minutes ago' : i === 2 ? '1 hour ago' : i === 3 ? '3 hours ago' : '1 day ago'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-card-dark rounded-card p-5 shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { title: 'Create New Order', description: 'Process a new customer order' },
              { title: 'Add New Product', description: 'Create a product listing' },
              { title: 'Generate Report', description: 'Create custom analytics report' },
              { title: 'Manage Inventory', description: 'Check and update stock levels' },
            ].map((action, i) => (
              <button
                key={i}
                className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{action.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;