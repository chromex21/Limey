import { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { TopHeader } from './components/layout/TopHeader';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightSmartPanel } from './components/layout/RightSmartPanel';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { CreateTopicPage } from './pages/CreateTopicPage';
import { CreateArticlePage } from './pages/CreateArticlePage';

function AppContent() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Header */}
      <TopHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Main Layout */}
      <div className="flex pt-16">
        {/* Left Sidebar */}
        <LeftSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {/* Main Content */}
        <main className="flex-1 ml-64 mr-80 p-6">
          {currentPage === 'home' && <HomePage selectedCategory={selectedCategory} />}
          {currentPage === 'explore' && <ExplorePage />}
          {currentPage === 'categories' && <CategoriesPage setSelectedCategory={setSelectedCategory} setCurrentPage={setCurrentPage} />}
          {currentPage === 'articles' && <ArticlesPage />}
          {currentPage === 'create-topic' && <CreateTopicPage />}
          {currentPage === 'create-article' && <CreateArticlePage />}
        </main>
        
        {/* Right Smart Panel */}
        <RightSmartPanel currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
