import { useState } from 'react';
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { formatTimeAgo } from '../../data/mockData';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export interface Author {
  id: string;
  name: string;
  avatar: string;
}

export interface Content {
  id: string;
  type: 'topic' | 'article';
  title: string;
  content: string;
  author: Author;
  category: string;
  tags: string[];
  votes: number;
  replies: number;
  views: number;
  createdAt: Date;
  trending?: boolean;
  readTime?: string;
}

interface ContentCardProps {
  content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const timeAgo = formatTimeAgo(content.createdAt);
  const [votes, setVotes] = useState(content.votes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  
  const handleVote = async () => {
    if (!user) {
      alert('Please sign in to vote');
      return;
    }

    if (hasVoted || isVoting) return;
    
    setIsVoting(true);
    try {
      const collectionName = content.type === 'topic' ? 'topics' : 'articles';
      const docRef = doc(db, collectionName, content.id);
      
      await updateDoc(docRef, {
        votes: increment(1)
      });
      
      setVotes(prev => prev + 1);
      setHasVoted(true);
      
      // Store vote in localStorage to persist across sessions
      const votedItems = JSON.parse(localStorage.getItem('voted_items') || '[]');
      votedItems.push(`${content.type}_${content.id}`);
      localStorage.setItem('voted_items', JSON.stringify(votedItems));
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. This might be mock data.');
    } finally {
      setIsVoting(false);
    }
  };

  // Check if user has already voted
  useState(() => {
    const votedItems = JSON.parse(localStorage.getItem('voted_items') || '[]');
    if (votedItems.includes(`${content.type}_${content.id}`)) {
      setHasVoted(true);
    }
  });
  
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
            <p className="text-sm text-gray-500">{timeAgo} ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            {content.category}
          </span>
        </div>
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
      <h3 className="text-xl font-bold mb-2 hover:text-blue-500 cursor-pointer transition">
        {content.title}
      </h3>
      
      {/* Snippet */}
      <p className="text-gray-600 dark:text-gray-400 mb-3">
        {content.content.length > 150 ? content.content.substring(0, 150) + '...' : content.content}
      </p>

      {/* Tags */}
      {content.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {content.tags.map(tag => (
            <span 
              key={tag}
              className={`px-2 py-1 rounded text-xs ${
                theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Stats & Actions */}
      <div className="flex items-center gap-6 text-sm">
        <button 
          onClick={handleVote}
          disabled={hasVoted || isVoting}
          className={`flex items-center gap-1 transition ${
            hasVoted 
              ? 'text-blue-500' 
              : 'text-gray-500 hover:text-blue-500'
          } disabled:opacity-50`}
        >
          <ThumbsUp className={`w-4 h-4 ${hasVoted ? 'fill-current' : ''}`} />
          <span className="font-medium">{votes}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition">
          <MessageCircle className="w-4 h-4" />
          <span>{content.replies}</span>
        </button>
        {content.type === 'article' && (
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{content.readTime}</span>
          </div>
        )}
        <span className="text-gray-400 ml-auto">{content.views} views</span>
      </div>
    </div>
  );
}
