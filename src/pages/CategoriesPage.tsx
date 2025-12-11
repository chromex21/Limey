
import { useTheme } from '../context/ThemeContext';

interface CategoriesPageProps {
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: string) => void;
}

export function CategoriesPage({ setSelectedCategory, setCurrentPage }: CategoriesPageProps) {
  const { theme } = useTheme();
  const categories = [
    { name: 'Programming', count: 245, icon: '💻' },
    { name: 'UI/UX', count: 120, icon: '🎨' },
    { name: 'Platform Tips', count: 89, icon: '💡' },
    { name: 'Community', count: 156, icon: '👥' },
    { name: 'Tutorials', count: 203, icon: '📚' },
    { name: 'News', count: 98, icon: '📰' },
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => {
              setSelectedCategory(cat.name);
              setCurrentPage('home');
            }}
            className={`p-6 rounded-xl border-2 text-left transition ${
              theme === 'dark'
                ? 'border-gray-700 hover:border-blue-500 bg-gray-800'
                : 'border-gray-200 hover:border-blue-500 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm text-gray-500">{cat.count} posts</span>
            </div>
            <h3 className="text-xl font-bold">{cat.name}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
