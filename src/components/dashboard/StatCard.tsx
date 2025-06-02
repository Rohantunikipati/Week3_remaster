import React from 'react';
import { cn } from '../../utils/cn';
import * as LucideIcons from 'lucide-react';
import { DashboardStat } from '../../types';

interface StatCardProps {
  stat: DashboardStat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const { title, value, change, icon, color } = stat;
  
  // Dynamically get the icon component from Lucide
  const IconComponent = (LucideIcons as Record<string, React.FC<{ size?: number }>>)[
    icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  ];

  const isPositive = change >= 0;

  return (
    <div className={cn(
      'bg-white dark:bg-card-dark rounded-card p-5',
      'shadow-card-light dark:shadow-card-dark',
      'border border-gray-100 dark:border-gray-800',
      'transition-transform duration-200 hover:translate-y-[-4px]',
      'animate-fade-in'
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
          
          <div className="flex items-center mt-2">
            <span className={cn(
              'flex items-center text-xs font-medium',
              isPositive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
            )}>
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs ml-1.5">vs last month</span>
          </div>
        </div>
        
        <div className={cn(
          'h-12 w-12 rounded-full flex items-center justify-center',
          `bg-${color}-100 dark:bg-${color}-900/20`,
          `text-${color}-600 dark:text-${color}-400`,
        )}>
          {IconComponent && <IconComponent size={24} />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;