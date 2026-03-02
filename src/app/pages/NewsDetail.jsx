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

  // fallback image jika kosong
  const imageUrl =
    article.image ||
    article.thumbnail ||
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#191919] mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Date */}
        <div className="flex items-center gap-2 text-[#AE8737] mb-8">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {new Date(article.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>

        {/* Image */}
        <div className="mb-10">
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-lg shadow"
          />
        </div>

        {/* Content (HTML render + styling) */}
        <div
          className="
            prose
            prose-lg
            max-w-none
            prose-headings:text-[#191919]
            prose-strong:text-[#191919]
            prose-p:text-slate-700
            prose-li:text-slate-700
            prose-a:text-[#AE8737]
            prose-img:rounded-lg
          "
          dangerouslySetInnerHTML={{
            __html: article.content
          }}
        />
      </div>
    </section>
  );
}