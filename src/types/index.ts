export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

export interface TableData {
  id: string;
  [key: string]: any;
}

export interface TableColumn {
  header: string;
  accessorKey: string;
  cell?: (info: any) => React.ReactNode;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: User;
  dueDate?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  color?: string;
}

export interface ThemeConfig {
  darkMode: boolean;
  primaryColor: string;
  sidebarCollapsed: boolean;
}

export interface DashboardStat {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}