import { useState } from 'react';
import { Search, Bell, MessageSquare, LogOut, User as UserIcon, Settings } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { LoginModal } from '../auth/LoginModal';

interface TopHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function TopHeader({ searchQuery, setSearchQuery }: TopHeaderProps) {
  const { theme } = useTheme();
  const { user, userProfile, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 h-16 ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-lg border-b z-50`}>
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span>Limey</span>
          </div>
          
          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-4 py-2`}>
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics, articles, users, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                  <MessageSquare className="w-5 h-5" />
                </button>
                
                {/* Profile Menu */}
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition"
                  >
                    <img 
                      src={userProfile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full" 
                    />
                  </button>
                  
                  {showProfileMenu && (
                    <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border ${
                      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-medium">{userProfile?.name || 'User'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                          <UserIcon className="w-4 h-4" />
                          Profile
                        </button>
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        <button 
                          onClick={logout}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-600 dark:text-red-400"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
