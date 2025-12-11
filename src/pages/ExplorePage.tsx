import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { mockData } from '../data/mockData';
import { ContentCard } from '../components/ui/ContentCard';

export function ExplorePage() {
  const [activeTab, setActiveTab] = useState('trending');
  const { theme } = useTheme();
  
  const tabs = ['Trending', 'Latest', 'Rising', 'New Articles', 'Popular'];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === tab.toLowerCase().replace(' ', '-')
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {mockData.topics.map(topic => (
          <ContentCard key={topic.id} content={topic} />
        ))}
      </div>
    </div>
  );
}
