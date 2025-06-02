import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  BarChart2, 
  Calendar, 
  Kanban, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import useThemeStore from '../../store/themeStore';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar, darkMode } = useThemeStore();
  
  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { title: 'Customers', icon: Users, path: '/customers' },
    { title: 'Products', icon: ShoppingBag, path: '/products' },
    { title: 'Analytics', icon: BarChart2, path: '/analytics' },
    { title: 'Calendar', icon: Calendar, path: '/calendar' },
    { title: 'Kanban', icon: Kanban, path: '/kanban' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        'h-screen fixed left-0 top-0 z-30 transition-all duration-300 ease-in-out',
        'border-r border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-card-dark',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        {!sidebarCollapsed && (
          <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
            AdminPanel
          </div>
        )}
        <button 
          onClick={toggleSidebar}
          className={cn(
            'p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800',
            'transition-colors duration-200',
            sidebarCollapsed ? 'mx-auto' : ''
          )}
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="pt-5 px-2">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex items-center py-2 px-3 w-full rounded-lg transition-colors duration-200',
                  'hover:bg-gray-100 dark:hover:bg-gray-800',
                  location.pathname === item.path 
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300',
                  sidebarCollapsed ? 'justify-center' : 'justify-start space-x-3'
                )}
              >
                <item.icon size={22} />
                {!sidebarCollapsed && <span>{item.title}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;