import React from 'react';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default' }) => {
  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    
    if (statusLower === 'active' || statusLower === 'completed' || statusLower === 'approved') {
      return 'success';
    }
    if (statusLower === 'pending' || statusLower === 'in progress' || statusLower === 'waiting') {
      return 'warning';
    }
    if (statusLower === 'inactive' || statusLower === 'cancelled' || statusLower === 'failed') {
      return 'error';
    }
    return 'secondary';
  };

  const color = getStatusColor(status);

  return variant === 'dot' ? (
    <div className="flex items-center space-x-1.5">
      <span className={cn(
        'h-2.5 w-2.5 rounded-full',
        color === 'success' && 'bg-success-500',
        color === 'warning' && 'bg-warning-500',
        color === 'error' && 'bg-error-500',
        color === 'secondary' && 'bg-secondary-500',
      )} />
      <span className="text-sm text-gray-700 dark:text-gray-300">{status}</span>
    </div>
  ) : (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      color === 'success' && 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400',
      color === 'warning' && 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400',
      color === 'error' && 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-400',
      color === 'secondary' && 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/20 dark:text-secondary-400',
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;