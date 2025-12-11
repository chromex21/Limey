import React from 'react';
import { mockData } from '../data/mockData';
import { ContentCard } from '../components/ui/ContentCard';

export function ArticlesPage() {
  const articles = mockData.topics.filter(t => t.type === 'article');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      
      <div className="space-y-4">
        {articles.map(article => (
          <ContentCard key={article.id} content={article} />
        ))}
      </div>
    </div>
  );
}
