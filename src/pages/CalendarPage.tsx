import React, { useState } from 'react';
import Calendar from '../components/calendar/Calendar';
import { mockCalendarEvents } from '../data/mockData';
import { CalendarEvent } from '../types';
import { Plus, X } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleAddEvent = (date: Date) => {
    console.log('Add event on', date);
    // In a real app, this would open a modal to add an event
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Calendar */}
        <div className="xl:col-span-9">
          <Calendar 
            events={events} 
            onEventClick={handleEventClick} 
            onAddEvent={handleAddEvent}
          />
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-3">
          <div className="bg-white dark:bg-card-dark rounded-card shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800 h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h2>
            </div>
            
            <div className="p-4 space-y-4">
              {events.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                  No upcoming events
                </p>
              ) : (
                events.map(event => (
                  <div 
                    key={event.id} 
                    onClick={() => handleEventClick(event)}
                    className={`
                      p-3 rounded-lg cursor-pointer
                      border-l-4
                      hover:bg-gray-50 dark:hover:bg-gray-800
                      transition-colors duration-150
                    `}
                    style={{ borderLeftColor: event.color || '#3b82f6' }}
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {new Date(event.start).toLocaleDateString(undefined, { 
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {event.location && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {event.location}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-card-dark rounded-lg shadow-lg max-w-md w-full animate-slide-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Event Details</h3>
              <button 
                onClick={() => setShowEventDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-medium text-gray-900 dark:text-white">{selectedEvent.title}</h4>
                  {selectedEvent.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {selectedEvent.description}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">Start:</div>
                    <div className="text-gray-900 dark:text-white">
                      {new Date(selectedEvent.start).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">End:</div>
                    <div className="text-gray-900 dark:text-white">
                      {new Date(selectedEvent.end).toLocaleString()}
                    </div>
                  </div>
                  {selectedEvent.location && (
                    <div className="flex items-center">
                      <div className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">Location:</div>
                      <div className="text-gray-900 dark:text-white">{selectedEvent.location}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
              <button 
                onClick={() => setShowEventDetails(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-150">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;