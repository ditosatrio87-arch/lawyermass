import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle,
  Clock,
  ShieldCheck,
  PlusCircle,
  FilePlus,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function DashboardOverview({ articles, documents }) {
  const navigate = useNavigate();

  // ======================
  // SAFE DEFAULT
  // ======================
  const safeArticles = articles || [];
  const safeDocuments = documents || [];

  // ======================
  // STAT CALCULATION
  // ======================
  const publishedArticles = safeArticles.filter(a => a.status === 'Published').length;
  const draftArticles = safeArticles.filter(a => a.status === 'Draft').length;
  const verifiedDocuments = safeDocuments.filter(d => d.status === 'Valid').length;
  const totalDocuments = safeDocuments.length;

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // ======================
  // STATS CONFIG
  // ======================
  const stats = [
    {
      title: 'Total Articles',
      value: safeArticles.length,
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      link: '/admin/news'
    },
    {
      title: 'Published',
      value: publishedArticles,
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      link: '/admin/news'
    },
    {
      title: 'Drafts',
      value: draftArticles,
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      link: '/admin/news'
    },
    {
      title: 'Verified Docs',
      value: verifiedDocuments,
      icon: ShieldCheck,
      color: 'text-[#AE8737]',
      bg: 'bg-[#AE8737]/10',
      link: '/admin/document-verification'
    },
    {
      title: 'Total Docs',
      value: totalDocuments,
      icon: FileText,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      link: '/admin/document-verification'
    }
  ];

  // ======================
  // RECENT DATA
  // ======================
  const recentArticles = [...safeArticles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const recentDocs = [...safeDocuments]
    .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
    .slice(0, 3);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191919]">
            Assalamualaikum Admin
          </h2>
          <p className="text-slate-500 text-sm">{today}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => navigate('/admin/news')}
            className="bg-[#AE8737] text-white flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            New Article
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/admin/document-verification')}
            className="flex items-center gap-2"
          >
            <FilePlus className="w-4 h-4" />
            Add Document
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/verify')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Open Verification Page
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              onClick={() => navigate(stat.link)}
              className="border-none shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-[#191919]">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* RECENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Articles */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold text-[#191919]">
                Recent Articles
              </h3>
              <Link to="/admin/news" className="text-sm text-[#AE8737]">
                View All
              </Link>
            </div>

            {recentArticles.length === 0 ? (
              <p className="text-slate-400 text-sm">No articles yet</p>
            ) : (
              <div className="space-y-4">
                {recentArticles.map(article => (
                  <div
                    key={article.id}
                    className="flex items-center gap-4 pb-4 border-b border-slate-100 last:border-0 cursor-pointer"
                    onClick={() => navigate('/admin/news')}
                  >
                    <div className="w-12 h-12 rounded bg-slate-100 overflow-hidden flex-shrink-0">
                      {article.image ? (
                        <img src={article.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <FileText className="w-6 h-6 text-slate-400 m-auto" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#191919] line-clamp-1">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {article.date} • {article.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold text-[#191919]">
                Recent Documents
              </h3>
              <Link to="/admin/document-verification" className="text-sm text-[#AE8737]">
                View All
              </Link>
            </div>

            {recentDocs.length === 0 ? (
              <p className="text-slate-400 text-sm">No documents yet</p>
            ) : (
              <div className="space-y-4">
                {recentDocs.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 cursor-pointer"
                    onClick={() => navigate('/admin/document-verification')}
                  >
                    <div>
                      <h4 className="font-medium text-[#191919]">
                        {doc.clientName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {doc.code} • {doc.type}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      doc.status === 'Valid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}