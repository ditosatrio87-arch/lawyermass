import React from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

export function DashboardOverview() {

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // ======================
  // STATIC STATS (AMAN)
  // ======================
  const stats = [
    {
      title: 'Total Articles',
      value: 3,
      icon: FileText,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Published',
      value: 2,
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'Drafts',
      value: 1,
      icon: Clock,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    {
      title: 'Verified Docs',
      value: 2,
      icon: ShieldCheck,
      color: 'text-[#AE8737]',
      bg: 'bg-[#AE8737]/10'
    },
    {
      title: 'Total Docs',
      value: 3,
      icon: FileText,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#191919]">
          Assalamualaikum Admin
        </h2>
        <p className="text-slate-500 text-sm">{today}</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <Card
              key={index}
              className="border-none shadow-sm hover:shadow-md transition"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    {stat.title}
                  </p>
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

      {/* INFO PANEL */}
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-[#191919] mb-2">
            Sistem Admin Aktif
          </h3>
          <p className="text-sm text-slate-500">
            Dashboard berfungsi normal. Gunakan menu di sidebar untuk mengelola berita,
            verifikasi dokumen, dan pengaturan website.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}