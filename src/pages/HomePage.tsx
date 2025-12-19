import { useEffect, useState } from 'react';
import { mockData } from '../data/mockData';
import { ContentCard, Content } from '../components/ui/ContentCard';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Loader2 } from 'lucide-react';

interface HomePageProps {
  selectedCategory: string | null;
  searchQuery: string;
}

export function HomePage({ selectedCategory, searchQuery }: HomePageProps) {
  const [topics, setTopics] = useState<Content[]>(mockData.topics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const loadedTopics = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            type: 'topic' as const,
            title: data.title,
            content: data.content,
            author: { id: data.authorId, name: 'User', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.authorId}` },
            category: data.category,
            tags: data.tags || [],
            votes: data.votes || 0,
            replies: data.replies || 0,
            views: data.views || 0,
            createdAt: data.createdAt?.toDate() || new Date(),
            trending: false
          } as Content;
        });
        setTopics([...loadedTopics, ...mockData.topics]);
      }
    } catch (error) {
      console.error('Error loading topics:', error);
      // Fall back to mock data on error
    } finally {
      setLoading(false);
    }
  };

  // Filter topics by category and search query
  const filteredTopics = topics.filter(topic => {
    const matchesCategory = !selectedCategory || topic.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Home</h1>
      <h2 className="text-xl font-semibold mb-6 text-gray-500">
        {selectedCategory ? `${selectedCategory} - ` : ''}Latest
        {searchQuery && ` (searching for "${searchQuery}")`}
      </h2>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          {filteredTopics.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No topics found</p>
              {searchQuery && <p className="text-sm">Try a different search term</p>}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTopics.map(topic => (
                <ContentCard key={topic.id} content={topic} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
