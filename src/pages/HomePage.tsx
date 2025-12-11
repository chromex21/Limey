import React from 'react';
import { mockData } from '../data/mockData';
import { ContentCard } from '../components/ui/ContentCard';

interface HomePageProps {
  selectedCategory: string | null;
}

export function HomePage({ selectedCategory }: HomePageProps) {
  const filteredTopics = selectedCategory 
    ? mockData.topics.filter(t => t.category === selectedCategory)
    : mockData.topics;
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Home</h1>
      <h2 className="text-xl font-semibold mb-6 text-gray-500">Latest</h2>
      
      <div className="space-y-4">
        {filteredTopics.map(topic => (
          <ContentCard key={topic.id} content={topic} />
        ))}
      </div>
    </div>
  );
}
