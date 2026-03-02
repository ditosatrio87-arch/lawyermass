import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Calendar } from 'lucide-react';

export function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetch article:', error);
      } else {
        setArticle(data);
      }

      setLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-24 text-center">
        <p>Article not found</p>
      </div>
    );
  }

  // Pastikan field image terbaca
  const imageUrl = article.image || article.thumbnail || article.cover || null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#191919] mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Date */}
        <div className="flex items-center gap-2 text-[#AE8737] mb-8">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {new Date(article.date).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Image */}
        {imageUrl && (
          <div className="mb-8">
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-[420px] object-cover rounded-xl shadow-sm"
            />
          </div>
        )}

        {/* Content (support bold, heading, etc) */}
        <div
          className="prose prose-lg max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

      </div>
    </section>
  );
}