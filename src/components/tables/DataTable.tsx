import React, { useState, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from 'lucide-react';
import { TableData, TableColumn } from '../../types';

interface DataTableProps {
  data: TableData[];
  columns: TableColumn[];
  title?: string;
  initialPageSize?: number;
}

const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  columns, 
  title, 
  initialPageSize = 5 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDesc, setSortDesc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filtered and sorted data
  const processedData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchTerm) {
      result = result.filter(item => {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Sort
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDesc 
            ? bValue.localeCompare(aValue) 
            : aValue.localeCompare(bValue);
        }
        
        return sortDesc 
          ? (bValue > aValue ? 1 : -1) 
          : (aValue > bValue ? 1 : -1);
      });
    }

    return result;
  }, [data, searchTerm, sortBy, sortDesc]);

  // Pagination
  const pageCount = Math.ceil(processedData.length / pageSize);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return processedData.slice(start, end);
  }, [processedData, currentPage, pageSize]);

  // Handle sorting
  const handleSort = (accessorKey: string) => {
    if (sortBy === accessorKey) {
      if (sortDesc) {
        setSortBy(null);
        setSortDesc(false);
      } else {
        setSortDesc(true);
      }
    } else {
      setSortBy(accessorKey);
      setSortDesc(false);
    }
  };

  // Create pagination buttons array
  const paginationButtons = useMemo(() => {
    let buttons = [];
    const maxButtons = 5; // Maximum number of page buttons to show

    if (pageCount <= maxButtons) {
      // Show all page buttons
      for (let i = 1; i <= pageCount; i++) {
        buttons.push(i);
      }
    } else {
      // Show first, last, current and some buttons around current
      buttons.push(1); // Always show first page

      // Calculate start and end of middle section
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(pageCount - 1, currentPage + 1);

      // Adjust when current page is near start or end
      if (currentPage <= 3) {
        end = Math.min(4, pageCount - 1);
      } else if (currentPage >= pageCount - 2) {
        start = Math.max(pageCount - 3, 2);
      }

      // Add ellipsis if needed
      if (start > 2) {
        buttons.push('...');
      }

      // Add middle section
      for (let i = start; i <= end; i++) {
        buttons.push(i);
      }

      // Add ellipsis if needed
      if (end < pageCount - 1) {
        buttons.push('...');
      }

      buttons.push(pageCount); // Always show last page
    }

    return buttons;
  }, [pageCount, currentPage]);

  return (
    <div className={cn(
      'bg-white dark:bg-card-dark rounded-card overflow-hidden',
      'shadow-card-light dark:shadow-card-dark',
      'border border-gray-100 dark:border-gray-800',
      'animate-fade-in'
    )}>
      {/* Table header */}
      <div className="px-4 py-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        {title && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h2>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className={cn(
                'w-full sm:w-64 pl-9 pr-3 py-2 rounded-lg',
                'border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800',
                'text-gray-800 dark:text-gray-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'transition-colors duration-200'
              )}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          
          <div className="flex items-center">
            <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Show:
            </label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1); // Reset to first page on page size change
              }}
              className={cn(
                'py-1.5 px-2 rounded border border-gray-300 dark:border-gray-600',
                'bg-white dark:bg-gray-800',
                'text-gray-800 dark:text-gray-200',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                'text-sm'
              )}
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
              {columns.map((column) => (
                <th 
                  key={column.accessorKey} 
                  className={cn(
                    'px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    'border-b border-gray-200 dark:border-gray-700',
                    column.accessorKey === sortBy ? 'text-primary-600 dark:text-primary-400' : '',
                  )}
                >
                  <button 
                    onClick={() => handleSort(column.accessorKey)}
                    className="flex items-center space-x-1"
                  >
                    <span>{column.header}</span>
                    <span>
                      {column.accessorKey === sortBy ? (
                        sortDesc ? <ChevronDown size={16} /> : <ChevronUp size={16} />
                      ) : (
                        <ChevronsUpDown size={16} className="text-gray-400 opacity-50" />
                      )}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {pageData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              pageData.map((row) => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                >
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.accessorKey}`} className="px-6 py-4 whitespace-nowrap">
                      {column.cell ? (
                        column.cell(row)
                      ) : (
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {row[column.accessorKey]}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{Math.min((currentPage - 1) * pageSize + 1, processedData.length)}</span> to{' '}
              <span className="font-medium">{Math.min(currentPage * pageSize, processedData.length)}</span> of{' '}
              <span className="font-medium">{processedData.length}</span> results
            </p>
          </div>
          <div className="flex-1 flex justify-center sm:justify-end">
            <nav className="flex items-center">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(
                  'px-3 py-1 rounded-md text-sm font-medium',
                  'border border-gray-300 dark:border-gray-600',
                  'mr-2 transition-colors duration-150',
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-1">
                {paginationButtons.map((button, i) => (
                  <button
                    key={i}
                    onClick={() => typeof button === 'number' && setCurrentPage(button)}
                    disabled={typeof button !== 'number'}
                    className={cn(
                      'inline-flex justify-center items-center w-8 h-8 rounded-md text-sm font-medium transition-colors duration-150',
                      typeof button !== 'number'
                        ? 'text-gray-600 dark:text-gray-400 cursor-default'
                        : button === currentPage
                          ? 'bg-primary-500 text-white border border-primary-500'
                          : 'text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    {button}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
                disabled={currentPage === pageCount}
                className={cn(
                  'px-3 py-1 rounded-md text-sm font-medium',
                  'border border-gray-300 dark:border-gray-600',
                  'ml-2 transition-colors duration-150',
                  currentPage === pageCount
                    ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;