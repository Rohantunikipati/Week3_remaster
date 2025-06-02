import React from 'react';
import { cn } from '../../utils/cn';
import * as LucideIcons from 'lucide-react';

interface AnalyticCardProps {
  title: string;
  value: string;
  description?: string;
  icon: string;
  trend?: number;
  color?: string;
}

const AnalyticCard: React.FC<AnalyticCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  color = 'primary',
}) => {
  const IconComponent = (LucideIcons as Record<string, React.FC<{ size?: number }>>)[
    icon.charAt(0).toUpperCase() + icon.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  ];

  return (
    <div className={cn(
      'bg-white dark:bg-card-dark rounded-card p-5',
      'shadow-card-light dark:shadow-card-dark',
      'border border-gray-100 dark:border-gray-800',
      'transition-all duration-200 hover:shadow-lg',
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          
          {trend !== undefined && (
            <div className="mt-2 flex items-center">
              <span className={cn(
                'flex items-center text-sm font-medium',
                trend > 0 
                  ? 'text-success-600 dark:text-success-400'
                  : trend < 0 
                    ? 'text-error-600 dark:text-error-400'
                    : 'text-gray-500 dark:text-gray-400'
              )}>
                {trend > 0 ? '+' : trend < 0 ? '' : '±'}{trend}%
              </span>
              
              {description && (
                <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">{description}</span>
              )}
            </div>
          )}
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

export default AnalyticCard;