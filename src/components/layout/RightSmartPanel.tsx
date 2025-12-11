import { useTheme } from '../../context/ThemeContext';
import { mockData } from '../../data/mockData';

interface RightSmartPanelProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function RightSmartPanel({ setCurrentPage }: RightSmartPanelProps) {
  const { theme } = useTheme();
  
  return (
    <aside className={`fixed right-0 top-16 bottom-0 w-80 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l overflow-y-auto p-6`}>
      {/* Create Something */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">Create Something</h3>
        <div className="space-y-2">
          <button 
            onClick={() => setCurrentPage('create-topic')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition"
          >
            Create Topic
          </button>
          <button 
            onClick={() => setCurrentPage('create-article')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition"
          >
            Create Article
          </button>
        </div>
      </div>
      
      {/* Trending Today */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">Trending Today</h3>
        <div className="space-y-3">
          {mockData.topics.slice(0, 4).map(topic => (
            <div key={topic.id} className="flex items-start justify-between text-sm">
              <div className="flex-1">
                <p className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
                  {topic.title.length > 40 ? topic.title.substring(0, 40) + '...' : topic.title}
                </p>
              </div>
              <span className="text-gray-500 text-xs ml-2">{topic.type === 'article' ? topic.views : topic.replies}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Suggested Categories */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-500 dark:text-gray-400">Suggested Categories</h3>
        <div className="space-y-2">
          {['Programming', 'UI/UX', 'Platform Tips'].map(cat => (
            <button
              key={cat}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
