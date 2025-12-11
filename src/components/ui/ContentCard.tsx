import React from 'react';
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { formatTimeAgo } from '../../data/mockData';

interface ContentCardProps {
  content: any;
}

export function ContentCard({ content }: ContentCardProps) {
  const { theme } = useTheme();
  const timeAgo = formatTimeAgo(content.createdAt);
  
  return (
    <div className={`p-6 rounded-xl border transition hover:shadow-lg ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img src={content.author.avatar} alt={content.author.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">{content.author.name}</p>
            <p className="text-sm text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-xl">⋯</span>
        </button>
      </div>
      
      {/* Content Type Badge */}
      <div className="mb-2">
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
          content.type === 'article'
            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
            : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
        }`}>
          {content.type === 'article' ? '📄 Article' : '💬 Topic'}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold mb-2">{content.title}</h3>
      
      {/* Snippet */}
      <p className="text-gray-600 dark:text-gray-400 mb-4">{content.content}</p>
      
      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" />
          <span>{content.votes}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{content.replies}</span>
        </div>
        {content.type === 'article' && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{content.readTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
