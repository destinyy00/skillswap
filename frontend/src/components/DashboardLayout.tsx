import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  User, 
  Calendar, 
  Search, 
  LogOut, 
  Menu, 
  X, 
  Moon, 
  Sun 
} from 'lucide-react';
import { Button } from '@shadcn/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Profile', path: '/profile-setup', icon: <User size={20} /> },
    { name: 'Sessions', path: '/sessions', icon: <Calendar size={20} /> },
    { name: 'Browse Skills', path: '/browse', icon: <Search size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 z-30 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <h1 className="ml-3 text-xl font-semibold">SkillSwap</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-50 ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)} />
      <div className={`md:hidden fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-zinc-800 z-20 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center space-x-3">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
              </div>
            )}
            <div>
              <div className="font-medium">{user?.displayName || user?.email}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Member</div>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 ${
                      location.pathname === item.path ? 'bg-gray-100 dark:bg-zinc-700 font-medium' : ''
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center">
            <h1 className="text-xl font-semibold">SkillSwap</h1>
          </div>
          <div className="p-4 flex items-center space-x-3">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
              </div>
            )}
            <div>
              <div className="font-medium">{user?.displayName || user?.email}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Member</div>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 ${
                      location.pathname === item.path ? 'bg-gray-100 dark:bg-zinc-700 font-medium' : ''
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-zinc-700 flex justify-between">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:ml-64 flex-1 min-h-screen">
        <div className="mt-16 md:mt-0 p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout; 