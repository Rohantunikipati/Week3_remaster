import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Header from './Header';
import Sidebar from './Sidebar';
import useThemeStore from '../../store/themeStore';

const Layout: React.FC = () => {
  const { sidebarCollapsed } = useThemeStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile sidebar on route change or screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileSidebarOpen]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        'lg:hidden fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out',
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <Sidebar />
      </div>

      {/* Desktop sidebar - always visible on large screens */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className={cn(
        'flex flex-col min-h-screen transition-all duration-300 ease-in-out',
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-20',
      )}>
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 p-4 sm:p-6 pt-20">
          <Outlet />
        </main>
        
        <footer className="border-t border-gray-200 dark:border-gray-800 py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2025 AdminPanel. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;