import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Blog Platform
            </Link>
          </div>

          {isAuthenticated ? (
            <nav className="flex items-center space-x-4">
              <Link
                to="/blogs"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/blogs') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Blogs
              </Link>
              <Link
                to="/blogs/my"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/blogs/my') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                My Blogs
              </Link>
              <Link
                to="/blogs/create"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/blogs/create') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Create Blog
              </Link>
              <Link
                to="/blogs/suggest"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/blogs/suggest') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Topic Suggestions
              </Link>
              
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.first_name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </nav>
          ) : (
            <nav className="flex items-center space-x-4">
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/login') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/register') 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Register
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

