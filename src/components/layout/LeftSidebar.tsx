
import { Home, Compass, Grid, Bookmark, FileText, File, Settings, Moon, Sun, MessageCircle, MessageSquare } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface LeftSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function LeftSidebar({ currentPage, setCurrentPage }: LeftSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'categories', icon: Grid, label: 'Categories' },
    { id: 'my-topics', icon: MessageCircle, label: 'My Topics' },
    { id: 'my-answers', icon: MessageSquare, label: 'My Answers' },
    { id: 'articles', icon: FileText, label: 'Articles' },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { id: 'drafts', icon: File, label: 'Drafts' },
  ];
  
  return (
    <aside className={`fixed left-0 top-16 bottom-0 w-64 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r overflow-y-auto`}>
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        
        {/* Footer Options */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span>Switch theme</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
