import React, { useState } from 'react';
import ThemeToggle from '../components/ui/ThemeToggle';
import useThemeStore from '../store/themeStore';
import { cn } from '../utils/cn';
import { Moon, Sun, Palette, LayoutDashboard, Bell, Shield, Users, CreditCard } from 'lucide-react';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode, setPrimaryColor } = useThemeStore();
  const [activeTab, setActiveTab] = useState('appearance');

  const colorOptions = [
    { name: 'Blue', value: 'blue', class: 'bg-primary-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
  ];

  const settingsTabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-card-dark rounded-card shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800 overflow-hidden">
            <nav className="divide-y divide-gray-200 dark:divide-gray-700">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-150',
                    activeTab === tab.id 
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  )}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-9">
          <div className="bg-white dark:bg-card-dark rounded-card shadow-card-light dark:shadow-card-dark border border-gray-100 dark:border-gray-800 overflow-hidden">
            {activeTab === 'appearance' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Appearance Settings</h2>
                
                <div className="space-y-8">
                  {/* Theme Mode */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Theme Mode</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => {
                          if (darkMode) toggleDarkMode();
                        }}
                        className={cn(
                          'flex items-center space-x-3 p-4 rounded-lg border-2',
                          'transition-colors duration-200',
                          !darkMode 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        )}
                      >
                        <div className="p-2 bg-white rounded-full shadow-sm">
                          <Sun size={24} className="text-warning-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">Light Mode</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Light background with dark text
                          </p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          if (!darkMode) toggleDarkMode();
                        }}
                        className={cn(
                          'flex items-center space-x-3 p-4 rounded-lg border-2',
                          'transition-colors duration-200',
                          darkMode 
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        )}
                      >
                        <div className="p-2 bg-gray-900 rounded-full shadow-sm">
                          <Moon size={24} className="text-primary-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">Dark Mode</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Dark background with light text
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Theme Color */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Theme Color</h3>
                    <div className="flex flex-wrap gap-4">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setPrimaryColor(color.value)}
                          className={cn(
                            'flex flex-col items-center space-y-2 group transition-transform duration-150 hover:scale-105',
                          )}
                        >
                          <div className={cn(
                            'h-10 w-10 rounded-full',
                            color.class,
                            'ring-2 ring-offset-2 dark:ring-offset-gray-900',
                            'transition-shadow duration-200',
                            useThemeStore.getState().primaryColor === color.value 
                              ? 'ring-gray-900 dark:ring-white' 
                              : 'ring-transparent group-hover:ring-gray-300 dark:group-hover:ring-gray-600'
                          )} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {color.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Layout */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Layout Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={true}
                          readOnly
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">Show sidebar on desktop</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={false}
                          readOnly
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">Compact sidebar mode</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          checked={true}
                          readOnly
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-gray-700 dark:text-gray-300">Sticky header</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'appearance' && (
              <div className="p-6 flex items-center justify-center min-h-[400px] text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {settingsTabs.find(tab => tab.id === activeTab)?.label} Settings
                  </h3>
                  <p>This settings section is not implemented in the demo.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;