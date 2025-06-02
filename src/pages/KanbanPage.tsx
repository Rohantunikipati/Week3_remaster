import React, { useState } from 'react';
import KanbanBoard from '../components/kanban/KanbanBoard';
import { mockKanbanData } from '../data/mockData';
import { KanbanTask, KanbanColumn } from '../types';
import { X, Users, Calendar, AlertTriangle, Edit } from 'lucide-react';
import { cn } from '../utils/cn';

const KanbanPage: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(mockKanbanData);
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const handleTaskMove = (result: any) => {
    const { source, destination } = result;
    
    // Dropped outside the list or no change
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Create a copy of the columns array
    const newColumns = [...columns];
    
    // Find source and destination column indexes
    const sourceColIndex = newColumns.findIndex(col => col.id === source.droppableId);
    const destColIndex = newColumns.findIndex(col => col.id === destination.droppableId);
    
    // Create copies of the task arrays
    const sourceTasksCopy = [...newColumns[sourceColIndex].tasks];
    const destTasksCopy = source.droppableId === destination.droppableId 
      ? sourceTasksCopy 
      : [...newColumns[destColIndex].tasks];
    
    // Remove the task from source
    const [movedTask] = sourceTasksCopy.splice(source.index, 1);
    
    // Add the task to destination
    destTasksCopy.splice(destination.index, 0, movedTask);
    
    // Update the columns
    newColumns[sourceColIndex].tasks = sourceTasksCopy;
    newColumns[destColIndex].tasks = destTasksCopy;
    
    setColumns(newColumns);
  };

  const handleTaskClick = (task: KanbanTask) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleAddTask = (columnId: string) => {
    console.log('Add task to column', columnId);
    // In a real app, this would open a modal to add a task
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
        <div className="flex items-center space-x-3">
          <select
            className="py-2 px-3 bg-white dark:bg-card-dark border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option>All Projects</option>
            <option>Website Redesign</option>
            <option>Mobile App</option>
            <option>Marketing Campaign</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg">
        <KanbanBoard 
          columns={columns} 
          onTaskMove={handleTaskMove}
          onTaskClick={handleTaskClick}
          onAddTask={handleAddTask}
        />
      </div>

      {/* Task Details Modal */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card-dark rounded-lg shadow-lg max-w-md w-full animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <span 
                  className={cn(
                    'w-3 h-3 rounded-full mr-2',
                    selectedTask.priority === 'high' ? 'bg-error-500' :
                    selectedTask.priority === 'medium' ? 'bg-warning-500' : 'bg-success-500'
                  )}
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Task Details
                </h3>
              </div>
              <button 
                onClick={() => setShowTaskDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {selectedTask.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedTask.description}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={18} className={cn(
                    selectedTask.priority === 'high' ? 'text-error-500' :
                    selectedTask.priority === 'medium' ? 'text-warning-500' : 'text-success-500'
                  )} />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)} Priority
                  </span>
                </div>
                
                {selectedTask.assignee && (
                  <div className="flex items-center space-x-2">
                    <Users size={18} className="text-secondary-500" />
                    <div className="flex items-center">
                      <img 
                        src={selectedTask.assignee.avatar} 
                        alt={selectedTask.assignee.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedTask.assignee.name}
                      </span>
                    </div>
                  </div>
                )}
                
                {selectedTask.dueDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-primary-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Due on {selectedTask.dueDate}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setShowTaskDetails(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-150 flex items-center space-x-2">
                <Edit size={16} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanPage;