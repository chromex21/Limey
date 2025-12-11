import { Content } from '../components/ui/ContentCard';

// Mock user data (replace with Firebase Auth in production)
export const mockUser = {
  id: 'user_1',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  email: 'john@example.com'
};

// Mock data for topics and articles
export const mockData: { topics: Content[] } = {
  topics: [
    {
      id: '1',
      type: 'topic' as const,
      title: 'How to use the platform effectively',
      content: 'We will discover the ins and outs of the platform, from creating topic to engaging with community members',
      author: { id: '2', name: 'Alice Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
      category: 'Platform Tips',
      tags: ['tutorial', 'beginner'],
      votes: 15,
      replies: 32,
      views: 245,
      createdAt: new Date(Date.now() - 5 * 60000),
      trending: true
    },
    {
      id: '2',
      type: 'topic' as const,
      title: "What's your favorite programming language?",
      content: "Vote on your favorite programming language in this poll and let's see which language the community prefers the most",
      author: { id: '3', name: 'Bob Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
      category: 'Programming',
      tags: ['poll', 'discussion'],
      votes: 45,
      replies: 88,
      views: 892,
      createdAt: new Date(Date.now() - 60000),
      trending: true
    },
    {
      id: '3',
      type: 'article' as const,
      title: 'JavaScript Best Practices',
      content: 'In this article, we will discuss best practices for writing clean and efficient JavaScript code',
      author: { id: '4', name: 'Caro Williams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Caro' },
      category: 'Programming',
      tags: ['javascript', 'tutorial', 'best-practices'],
      votes: 250,
      replies: 34,
      views: 1563,
      readTime: '8m',
      createdAt: new Date(Date.now() - 8 * 60000),
      trending: true
    },
    {
      id: '4',
      type: 'article' as const,
      title: 'Designing a user-friendly interface',
      content: 'Learn the principles of creating intuitive and accessible user interfaces',
      author: { id: '5', name: 'Diana Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana' },
      category: 'UI/UX',
      tags: ['design', 'ui', 'ux'],
      votes: 180,
      replies: 45,
      views: 1024,
      readTime: '12m',
      createdAt: new Date(Date.now() - 3600000),
      trending: true
    }
  ]
};

// Utility function to format time ago
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
