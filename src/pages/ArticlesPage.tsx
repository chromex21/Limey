import { useEffect, useState } from 'react';
import { mockData } from '../data/mockData';
import { ContentCard, Content } from '../components/ui/ContentCard';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Loader2 } from 'lucide-react';

interface ArticlesPageProps {
  searchQuery: string;
}

export function ArticlesPage({ searchQuery }: ArticlesPageProps) {
  const [articles, setArticles] = useState<Content[]>(mockData.topics.filter(t => t.type === 'article'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const loadedArticles = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            type: 'article' as const,
            title: data.title,
            content: data.content,
            author: { id: data.authorId, name: 'User', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.authorId}` },
            category: data.category,
            tags: data.tags || [],
            votes: data.votes || 0,
            replies: data.replies || 0,
            views: data.views || 0,
            readTime: data.readTime || '5m',
            createdAt: data.createdAt?.toDate() || new Date(),
            trending: false
          } as Content;
        });
        setArticles([...loadedArticles, ...mockData.topics.filter(t => t.type === 'article')]);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    if (!searchQuery) return true;
    return article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
           article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Articles {searchQuery && `(searching for "${searchQuery}")`}
      </h1>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No articles found</p>
              {searchQuery && <p className="text-sm">Try a different search term</p>}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map(article => (
                <ContentCard key={article.id} content={article} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
