import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeConfig } from '../types';

interface ThemeState extends ThemeConfig {
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setPrimaryColor: (color: string) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: false,
      primaryColor: 'blue',
      sidebarCollapsed: false,
      
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setPrimaryColor: (color) => set({ primaryColor: color }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;