import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export function CreateTopicPage() {
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
