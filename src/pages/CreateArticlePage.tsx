import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Loader2, CheckCircle, Eye } from 'lucide-react';

export function CreateArticlePage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);
  
  const handlePublish = async () => {
    if (!user) {
      setError('You must be logged in to create an article');
      return;
    }

    if (!title.trim() || !content.trim() || !category) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await addDoc(collection(db, 'articles'), {
        title: title.trim(),
        content: content.trim(),
        authorId: user.uid,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        votes: 0,
        views: 0,
        readTime: `${Math.ceil(content.trim().split(' ').length / 200)}m`,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      setSuccess(true);
      setTimeout(() => {
        setTitle('');
        setContent('');
        setCategory('');
        setTags('');
        setSuccess(false);
        setPreview(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    const draft = { title, content, category, tags, savedAt: new Date().toISOString() };
    localStorage.setItem('article_draft', JSON.stringify(draft));
    alert('Draft saved locally!');
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Write New Article</h1>
      
      {!user && (
        <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg">
          Please log in to create articles
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
          Article published successfully!
        </div>
      )}
      
      {preview ? (
        <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} mb-4`}>
          <h2 className="text-3xl font-bold mb-4">{title || 'Untitled Article'}</h2>
          <div className="prose dark:prose-invert max-w-none">
            {content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          <button 
            onClick={() => setPreview(false)}
            className="mt-6 text-blue-500 hover:text-blue-600 font-medium"
          >
            ← Back to Edit
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="An eye-catching title..."
              disabled={!user}
              className={`w-full px-4 py-3 rounded-lg border text-lg ${
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
              placeholder="Write your article... (Tip: Use line breaks for paragraphs)"
              rows={12}
              disabled={!user}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-300'
              } outline-none focus:border-blue-500 transition font-mono text-sm disabled:opacity-50`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Estimated read time: {Math.ceil(content.trim().split(' ').length / 200) || 0} min
            </p>
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
                <option value="Tutorials">Tutorials</option>
                <option value="News">News</option>
                <option value="Opinion">Opinion</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="javascript, react, tutorial"
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
              {loading ? 'Publishing...' : 'Publish Article'}
            </button>
            <button 
              onClick={() => setPreview(true)}
              disabled={!user || !title.trim() || !content.trim()}
              className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 disabled:opacity-50 ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <Eye className="w-5 h-5" />
              Preview
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
      )}
    </div>
  );
}
