import React from 'react';
import DataTable from '../components/tables/DataTable';
import { mockProductsData } from '../data/mockData';
import { TableColumn } from '../types';
import { Star } from 'lucide-react';

const Products: React.FC = () => {
  // Define columns for the products table
  const columns: TableColumn[] = [
    {
      header: 'Product',
      accessorKey: 'name',
      cell: (info) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {info.name}
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (info) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          {info.category}
        </span>
      ),
    },
    {
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Stock',
      accessorKey: 'stock',
      cell: (info) => {
        const stockLevel = parseInt(info.stock);
        let textColor = 'text-gray-700 dark:text-gray-300';
        
        if (stockLevel <= 20) {
          textColor = 'text-error-600 dark:text-error-400 font-medium';
        } else if (stockLevel <= 50) {
          textColor = 'text-warning-600 dark:text-warning-400';
        }
        
        return <span className={textColor}>{info.stock}</span>;
      },
    },
    {
      header: 'Rating',
      accessorKey: 'rating',
      cell: (info) => (
        <div className="flex items-center">
          <span className="text-gray-700 dark:text-gray-300 mr-1.5">{info.rating}</span>
          <Star className="w-4 h-4 text-warning-500 fill-warning-500" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
          <span>Add Product</span>
        </button>
      </div>

      <DataTable
        data={mockProductsData}
        columns={columns}
        title="Product Inventory"
      />
    </div>
  );
};

export default Products;