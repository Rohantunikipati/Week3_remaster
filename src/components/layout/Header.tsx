import React, { useState } from 'react';
import { Bell, Search, Menu, User, LogOut, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import ThemeToggle from '../ui/ThemeToggle';
import useThemeStore from '../../store/themeStore';
import { mockNotifications, mockUsers } from '../../data/mockData';

interface HeaderProps {
  toggleMobileSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { darkMode } = useThemeStore();
  const currentUser = mockUsers[0]; // Using the first mock user as current user
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  return (
    <header className={cn(
      'h-16 fixed top-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6',
      'bg-white dark:bg-card-dark border-b border-gray-200 dark:border-gray-700',
      'transition-all duration-300',
      useThemeStore((state) => state.sidebarCollapsed) ? 'left-20' : 'left-64',
      'lg:left-0 lg:right-0 lg:w-full'
    )}>
      <div className="flex items-center lg:hidden">
        <button
          onClick={toggleMobileSidebar}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="hidden lg:flex items-center ml-8 flex-1">
        <div className="relative max-w-md w-full">
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              'w-full py-2 pl-10 pr-4 rounded-lg',
              'border border-gray-300 dark:border-gray-600',
              'bg-gray-50 dark:bg-gray-800',
              'text-gray-800 dark:text-gray-200',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
              'transition-colors duration-200'
            )}
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative"
          >
            <Bell size={22} />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 bg-error-500 rounded-full text-white text-xs flex items-center justify-center">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className={cn(
              'absolute right-0 mt-2 w-80 rounded-lg shadow-dropdown-light dark:shadow-dropdown-dark',
              'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700',
              'z-50 py-2 animate-fade-in'
            )}>
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {mockNotifications.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No notifications</p>
                ) : (
                  mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        'px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0',
                        'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150',
                        !notification.read && 'bg-primary-50 dark:bg-primary-900/10'
                      )}
                    >
                      <div className="flex items-start">
                        <div className={cn(
                          'w-2 h-2 rounded-full mt-1.5 mr-3',
                          notification.type === 'info' && 'bg-primary-500',
                          notification.type === 'success' && 'bg-success-500',
                          notification.type === 'warning' && 'bg-warning-500',
                          notification.type === 'error' && 'bg-error-500'
                        )} />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-200">{notification.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{notification.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
            <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200">
              {currentUser.name}
            </span>
          </button>

          {showUserMenu && (
            <div className={cn(
              'absolute right-0 mt-2 w-56 rounded-lg shadow-dropdown-light dark:shadow-dropdown-dark',
              'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700',
              'z-50 py-2 animate-fade-in'
            )}>
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{currentUser.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
              </div>
              <div className="py-1">
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;