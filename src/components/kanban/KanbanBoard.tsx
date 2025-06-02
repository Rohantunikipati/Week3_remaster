import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { KanbanColumn, KanbanTask } from '../../types';

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onTaskMove?: (result: any) => void;
  onAddTask?: (columnId: string) => void;
  onTaskClick?: (task: KanbanTask) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns: initialColumns,
  onTaskMove,
  onAddTask,
  onTaskClick,
}) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // No change
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination columns
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);
    
    if (!sourceColumn || !destColumn) return;
    
    // Create a copy of the columns array
    const newColumns = [...columns];
    
    // Get source and destination column indexes
    const sourceColIndex = newColumns.findIndex(col => col.id === source.droppableId);
    const destColIndex = newColumns.findIndex(col => col.id === destination.droppableId);
    
    // Create copies of the task arrays
    const sourceTasksCopy = [...sourceColumn.tasks];
    const destTasksCopy = source.droppableId === destination.droppableId 
      ? sourceTasksCopy 
      : [...destColumn.tasks];
    
    // Remove the task from source
    const [movedTask] = sourceTasksCopy.splice(source.index, 1);
    
    // Add the task to destination
    destTasksCopy.splice(destination.index, 0, movedTask);
    
    // Update the columns
    newColumns[sourceColIndex].tasks = sourceTasksCopy;
    newColumns[destColIndex].tasks = destTasksCopy;
    
    setColumns(newColumns);
    
    // Notify parent component if callback exists
    if (onTaskMove) {
      onTaskMove(result);
    }
  };

  return (
    <div className="p-4 h-full overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 h-full">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex flex-col min-w-[280px] w-72 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="p-3 font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <span>{column.title}</span>
                  <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-2 py-0.5 text-xs">
                    {column.tasks.length}
                  </span>
                </div>
                {onAddTask && (
                  <button
                    onClick={() => onAddTask(column.id)}
                    className="text-gray-500 hover:text-primary-500 transition-colors"
                  >
                    <PlusCircle size={18} />
                  </button>
                )}
              </div>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      'flex-1 p-2 overflow-y-auto',
                      snapshot.isDraggingOver ? 'bg-gray-200/50 dark:bg-gray-700/50' : ''
                    )}
                    style={{ minHeight: '200px' }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => onTaskClick?.(task)}
                            className={cn(
                              'p-3 mb-2 rounded-lg bg-white dark:bg-card-dark',
                              'shadow-sm border border-gray-100 dark:border-gray-800',
                              'cursor-pointer transition-all duration-150',
                              'hover:shadow hover:-translate-y-1',
                              snapshot.isDragging ? 'shadow-md' : ''
                            )}
                          >
                            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                              {task.title}
                            </h3>
                            {task.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className={cn(
                                'text-xs px-2 py-1 rounded-full',
                                task.priority === 'high' ? 'bg-error-100 text-error-700 dark:bg-error-900/20 dark:text-error-400' :
                                task.priority === 'medium' ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400' :
                                'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400'
                              )}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                              
                              {task.assignee && (
                                <div className="flex items-center">
                                  <img 
                                    src={task.assignee.avatar} 
                                    alt={task.assignee.name}
                                    className="w-5 h-5 rounded-full mr-1"
                                  />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {task.assignee.name}
                                  </span>
                                </div>
                              )}
                              
                              {task.dueDate && (
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {task.dueDate}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;