import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@shadcn/ui/button';
import { Menu, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-md px-4 py-2 flex items-center justify-between">
      <Link to="/" className="font-bold text-xl text-primary">SkillSwap</Link>
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/profile-setup" className="hover:underline">Profile</Link>
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
              )}
              <span className="font-medium">{user.displayName || user.email}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut size={20} />
              </Button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </Button>
        {menuOpen && (
          <div className="absolute top-14 right-4 bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-4 flex flex-col gap-2 z-50 min-w-[160px]">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:underline" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/profile-setup" className="hover:underline" onClick={() => setMenuOpen(false)}>Profile</Link>
                <div className="flex items-center gap-2 mt-2">
                  {user.photoURL && (
                    <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                  )}
                  <span className="font-medium">{user.displayName || user.email}</span>
                  <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                    <LogOut size={20} />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/signup" className="hover:underline" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 