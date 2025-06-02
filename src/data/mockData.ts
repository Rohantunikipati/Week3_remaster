import { DashboardStat, TableData, ChartData, KanbanColumn, CalendarEvent, User, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'Admin',
  },
  {
    id: 'user2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'Manager',
  },
  {
    id: 'user3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    role: 'Developer',
  },
];

// Mock Dashboard Stats
export const mockStats: DashboardStat[] = [
  {
    title: 'Total Revenue',
    value: '$24,345',
    change: 12.5,
    icon: 'dollar-sign',
    color: 'primary',
  },
  {
    title: 'Active Users',
    value: '8,942',
    change: 7.2,
    icon: 'users',
    color: 'secondary',
  },
  {
    title: 'New Orders',
    value: '1,245',
    change: -3.8,
    icon: 'shopping-cart',
    color: 'accent',
  },
  {
    title: 'Conversion Rate',
    value: '3.45%',
    change: 2.1,
    icon: 'percent',
    color: 'success',
  },
];

// Mock Chart Data
export const mockRevenueData: ChartData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Revenue',
      data: [18000, 21000, 24000, 19000, 22000, 25000, 29000, 27000, 30000, 32000, 31000, 34000],
    },
    {
      name: 'Expenses',
      data: [14000, 15000, 16000, 15500, 17000, 18000, 19000, 19500, 20000, 21000, 21500, 22000],
    },
  ],
};

export const mockUsersData: ChartData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      name: 'New Users',
      data: [340, 380, 420, 390, 450, 480],
    },
    {
      name: 'Active Users',
      data: [1200, 1300, 1450, 1500, 1650, 1800],
    },
  ],
};

// Mock Table Data
export const mockCustomersData: TableData[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', joined: '2023-01-15', orders: 12 },
  { id: '2', name: 'Michael Brown', email: 'michael@example.com', status: 'inactive', joined: '2023-02-20', orders: 5 },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', status: 'active', joined: '2023-03-10', orders: 18 },
  { id: '4', name: 'David Wilson', email: 'david@example.com', status: 'pending', joined: '2023-04-05', orders: 2 },
  { id: '5', name: 'Jessica Moore', email: 'jessica@example.com', status: 'active', joined: '2023-05-22', orders: 8 },
  { id: '6', name: 'Andrew Taylor', email: 'andrew@example.com', status: 'active', joined: '2023-06-15', orders: 10 },
  { id: '7', name: 'Olivia White', email: 'olivia@example.com', status: 'inactive', joined: '2023-07-08', orders: 4 },
  { id: '8', name: 'Kevin Martin', email: 'kevin@example.com', status: 'active', joined: '2023-08-19', orders: 15 },
];

export const mockProductsData: TableData[] = [
  { id: 'p1', name: 'Wireless Headphones', category: 'Electronics', price: '$129.99', stock: 45, rating: 4.7 },
  { id: 'p2', name: 'Smart Watch', category: 'Electronics', price: '$199.99', stock: 28, rating: 4.5 },
  { id: 'p3', name: 'Yoga Mat', category: 'Fitness', price: '$35.99', stock: 60, rating: 4.2 },
  { id: 'p4', name: 'Coffee Maker', category: 'Kitchen', price: '$89.99', stock: 15, rating: 4.8 },
  { id: 'p5', name: 'Desk Lamp', category: 'Home Office', price: '$45.99', stock: 30, rating: 4.4 },
  { id: 'p6', name: 'Bluetooth Speaker', category: 'Electronics', price: '$79.99', stock: 22, rating: 4.6 },
  { id: 'p7', name: 'Backpack', category: 'Accessories', price: '$59.99', stock: 50, rating: 4.3 },
  { id: 'p8', name: 'Water Bottle', category: 'Fitness', price: '$24.99', stock: 75, rating: 4.1 },
];

// Mock Kanban Data
export const mockKanbanData: KanbanColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 'task1',
        title: 'Research competitors',
        description: 'Analyze top 5 competitors in the market',
        priority: 'medium',
      },
      {
        id: 'task2',
        title: 'Design new landing page',
        description: 'Create wireframes and mockups',
        priority: 'high',
        assignee: mockUsers[0],
        dueDate: '2023-11-15',
      },
      {
        id: 'task3',
        title: 'Update documentation',
        description: 'Review and update user guides',
        priority: 'low',
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: 'task4',
        title: 'Implement authentication',
        description: 'Add OAuth2 authentication flow',
        priority: 'high',
        assignee: mockUsers[2],
        dueDate: '2023-11-10',
      },
      {
        id: 'task5',
        title: 'Fix responsive issues',
        description: 'Address UI problems on mobile devices',
        priority: 'medium',
        assignee: mockUsers[1],
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: 'task6',
        title: 'Code review PR #42',
        description: 'Review and approve pull request',
        priority: 'medium',
        assignee: mockUsers[2],
        dueDate: '2023-11-08',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 'task7',
        title: 'Update dependencies',
        description: 'Upgrade all packages to latest versions',
        priority: 'low',
        assignee: mockUsers[2],
      },
      {
        id: 'task8',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated build and deploy',
        priority: 'high',
        assignee: mockUsers[1],
      },
    ],
  },
];

// Mock Calendar Events
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event1',
    title: 'Team Meeting',
    start: new Date(today.setHours(10, 0, 0, 0)),
    end: new Date(today.setHours(11, 30, 0, 0)),
    description: 'Weekly team sync',
    location: 'Conference Room A',
    color: '#3b82f6',
  },
  {
    id: 'event2',
    title: 'Client Presentation',
    start: new Date(tomorrow.setHours(14, 0, 0, 0)),
    end: new Date(tomorrow.setHours(15, 0, 0, 0)),
    description: 'Product demo for XYZ Corp',
    location: 'Virtual',
    color: '#8b5cf6',
  },
  {
    id: 'event3',
    title: 'Project Deadline',
    start: new Date(nextWeek),
    end: new Date(nextWeek),
    description: 'Submit final deliverables',
    color: '#ef4444',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    title: 'New Order',
    message: 'You received a new order (#12345)',
    time: '2 minutes ago',
    read: false,
    type: 'info',
  },
  {
    id: 'notif2',
    title: 'Payment Successful',
    message: 'Payment for order #12344 was successful',
    time: '1 hour ago',
    read: false,
    type: 'success',
  },
  {
    id: 'notif3',
    title: 'Stock Alert',
    message: 'Product "Wireless Headphones" is low in stock',
    time: '3 hours ago',
    read: true,
    type: 'warning',
  },
  {
    id: 'notif4',
    title: 'System Error',
    message: 'Database connection failed briefly',
    time: '1 day ago',
    read: true,
    type: 'error',
  },
];