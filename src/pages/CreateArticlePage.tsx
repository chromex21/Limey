import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export function CreateArticlePage() {
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
