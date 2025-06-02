import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { CalendarEvent } from '../../types';

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  onAddEvent?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ 
  events, 
  onEventClick, 
  onDateClick,
  onAddEvent
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    onDateClick?.(day);
  };

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(new Date(event.start), day));
  };

  return (
    <div className="bg-white dark:bg-card-dark rounded-card shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800 animate-fade-in">
      {/* Calendar Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days of Week */}
        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the month starts */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 sm:h-28 md:h-32 p-1" />
          ))}

          {/* Actual days in the month */}
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isSelected = isSameDay(day, selectedDate);
            const dayIsToday = isToday(day);

            return (
              <div
                key={day.toString()}
                className={cn(
                  'h-24 sm:h-28 md:h-32 p-1 border border-gray-100 dark:border-gray-800 overflow-hidden',
                  'transition-colors duration-150',
                  isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : '',
                  'rounded-md'
                )}
                onClick={() => handleDateClick(day)}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-sm',
                      dayIsToday
                        ? 'bg-primary-500 text-white font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                  {onAddEvent && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddEvent(day);
                      }}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <Plus size={12} />
                    </button>
                  )}
                </div>

                <div className="mt-1 space-y-1 max-h-[calc(100%-1.5rem)] overflow-hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      className={cn(
                        'text-xs py-1 px-1.5 rounded truncate cursor-pointer',
                        'hover:opacity-90 transition-opacity',
                      )}
                      style={{ backgroundColor: event.color || '#3b82f6', color: '#fff' }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-1.5">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;