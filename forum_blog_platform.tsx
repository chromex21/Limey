import React, { useState, useEffect, createContext, useContext } from 'react';
import { Home, Compass, Grid, Bookmark, FileText, File, Settings, Moon, Sun, Bell, MessageSquare, User, Search, Plus, TrendingUp, Clock, Users, Tag, Edit3, Trash2, Eye, MessageCircle, ThumbsUp, ChevronRight } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

// Mock Firebase (replace with real Firebase in production)
const mockUser = {
  id: 'user_1',
  name: 'John Doe',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  email: 'john@example.com'
};

const mockData = {
  topics: [
    {
      id: '1',
      type: 'topic',
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
      type: 'topic',
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
      type: 'article',
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
      type: 'article',
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

// Main App Component
export default function ForumBlogPlatform() {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
    </ThemeContext.Provider>
  );
}

// Top Header Component
function TopHeader({ searchQuery, setSearchQuery }) {
  const { theme } = useTheme();
  
  return (
    <header className={`fixed top-0 left-0 right-0 h-16 ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-lg border-b z-50`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span>Forum</span>
        </div>
        
        {/* Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className={`flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-4 py-2`}>
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search topics, articles, users, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>
        
        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
            <MessageSquare className="w-5 h-5" />
          </button>
          <img src={mockUser.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}

// Left Sidebar Component
function LeftSidebar({ currentPage, setCurrentPage }) {
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

// Right Smart Panel Component
function RightSmartPanel({ currentPage, setCurrentPage }) {
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

// Home Page Component
function HomePage({ selectedCategory }) {
  const { theme } = useTheme();
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

// Explore Page Component
function ExplorePage() {
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

// Categories Page Component
function CategoriesPage({ setSelectedCategory, setCurrentPage }) {
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

// Articles Page Component
function ArticlesPage() {
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

// Create Topic Page Component
function CreateTopicPage() {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Topic</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } outline-none focus:border-blue-500 transition`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={8}
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } outline-none focus:border-blue-500 transition`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition`}
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="ui-ux">UI/UX</option>
              <option value="tips">Platform Tips</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tutorial, beginner, help"
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition`}
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition">
            Publish Topic
          </button>
          <button className={`px-6 py-3 rounded-lg font-medium transition ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

// Create Article Page Component
function CreateArticlePage() {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Write New Article</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Article Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="An eye-catching title..."
            className={`w-full px-4 py-3 rounded-lg border text-lg ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } outline-none focus:border-blue-500 transition`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your article in Markdown or rich text..."
            rows={12}
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } outline-none focus:border-blue-500 transition font-mono text-sm`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition`}
            >
              <option value="">Select a category</option>
              <option value="programming">Programming</option>
              <option value="ui-ux">UI/UX</option>
              <option value="tutorials">Tutorials</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="javascript, react, tutorial"
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition`}
            />
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition">
            Publish Article
          </button>
          <button className={`px-6 py-3 rounded-lg font-medium transition ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            Preview
          </button>
          <button className={`px-6 py-3 rounded-lg font-medium transition ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}

// Content Card Component (reusable for topics and articles)
function ContentCard({ content }) {
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

// Utility function to format time ago
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}