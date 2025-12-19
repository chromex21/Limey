import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { createTopic, TopicData } from '../firebase/firestore';
import { Loader2, CheckCircle } from 'lucide-react';

export function CreateTopicPage() {
  const { theme } = useTheme();
  const { user, userProfile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const handlePublish = async () => {
    if (!user) {
      setError('You must be logged in to create a topic');
      return;
    }

    if (!title.trim() || !content.trim() || !category) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const topicData: TopicData = {
        title: title.trim(),
        content: content.trim(),
        authorId: user.uid,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      };

      await createTopic(topicData);
      setSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle('');
        setContent('');
        setCategory('');
        setTags('');
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create topic');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    // Save to localStorage for now (can be enhanced to use Firestore later)
    const draft = { title, content, category, tags, savedAt: new Date().toISOString() };
    localStorage.setItem('topic_draft', JSON.stringify(draft));
    alert('Draft saved locally!');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Topic</h1>
      
      {!user && (
        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg">
          Please log in to create topics
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Topic published successfully!
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind?"
            disabled={!user}
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } outline-none focus:border-blue-500 transition disabled:opacity-50`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={8}
            disabled={!user}
            className={`w-full px-4 py-3 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-300'
            } outline-none focus:border-blue-500 transition disabled:opacity-50`}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={!user}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition disabled:opacity-50`}
            >
              <option value="">Select a category</option>
              <option value="Programming">Programming</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Platform Tips">Platform Tips</option>
              <option value="General">General</option>
              <option value="Help">Help</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tutorial, beginner, help"
              disabled={!user}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition disabled:opacity-50`}
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>
        </div>
        
        <div className="flex gap-3 pt-4">
          <button 
            onClick={handlePublish}
            disabled={!user || loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Publishing...' : 'Publish Topic'}
          </button>
          <button 
            onClick={handleSaveDraft}
            disabled={!user}
            className={`px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 ${
              theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
}
