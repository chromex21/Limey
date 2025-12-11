
import { Search, Bell, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { mockUser } from '../../data/mockData';

interface TopHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function TopHeader({ searchQuery, setSearchQuery }: TopHeaderProps) {
  const { theme } = useTheme();
  
  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-lg border-b z-50`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span>Forum</span>
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
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <MessageSquare className="w-5 h-5" />
          </button>
          <img src={mockUser.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}
