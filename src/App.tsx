import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Analytics from './pages/Analytics';
import CalendarPage from './pages/CalendarPage';
import KanbanPage from './pages/KanbanPage';
import Settings from './pages/Settings';
import useThemeStore from './store/themeStore';

function App() {
  const { darkMode } = useThemeStore();

  useEffect(() => {
    // Update the document class when the theme changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="kanban" element={<KanbanPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;