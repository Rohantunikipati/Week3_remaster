import React from 'react';
import DataTable from '../components/tables/DataTable';
import StatusBadge from '../components/tables/StatusBadge';
import { mockCustomersData } from '../data/mockData';
import { TableColumn } from '../types';

const Customers: React.FC = () => {
  // Define columns for the customers table
  const columns: TableColumn[] = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400">
            {info.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{info.name}</span>
        </div>
      ),
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => <StatusBadge status={info.status} />,
    },
    {
      header: 'Joined',
      accessorKey: 'joined',
      cell: (info) => (
        <span className="text-gray-700 dark:text-gray-300">
          {new Date(info.joined).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Orders',
      accessorKey: 'orders',
      cell: (info) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {info.orders}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
          <span>Add Customer</span>
        </button>
      </div>

      <DataTable
        data={mockCustomersData}
        columns={columns}
        title="Customer List"
      />
    </div>
  );
};

export default Customers;