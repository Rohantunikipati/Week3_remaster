import React from 'react';
import { Moon, Sun } from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import { cn } from '../../utils/cn';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  React.useEffect(() => {
    // Update the document class when the theme changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode}
      className={cn(
        'relative inline-flex h-8 w-16 rounded-full transition-colors duration-200 ease-in-out focus:outline-none',
        darkMode ? 'bg-primary-500' : 'bg-gray-200'
      )}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={cn(
          'pointer-events-none relative inline-block h-7 w-7 rounded-full bg-white shadow transform transition duration-200 ease-in-out',
          darkMode ? 'translate-x-8' : 'translate-x-1'
        )}
      >
        {darkMode ? (
          <Moon className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-500" />
        ) : (
          <Sun className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-warning-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;