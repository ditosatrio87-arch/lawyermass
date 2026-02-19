import { useState } from 'react';
import { 
  LayoutDashboard, 
  Newspaper, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import sub-components
import { DashboardOverview } from './admin/DashboardOverview';
import { ManageNews } from './admin/ManageNews';
import { DocumentVerification } from './admin/DocumentVerification';
import { SiteSettings } from './admin/SiteSettings';

export function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock Data: Articles
  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: "Regulasi Hukum Korporasi Terbaru: Yang Perlu Diketahui Bisnis Anda",
      slug: "regulasi-hukum-korporasi-terbaru",
      category: "Corporate Law",
      date: "2026-01-02",
      summary: "Pembaruan terkini dalam regulasi hukum korporasi yang dapat mempengaruhi operasional bisnis Anda.",
      content: "Full content of the article...",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200",
      status: "Published",
      featured: true
    },
    {
      id: 2,
      title: "Perlindungan Merek di Era Digital: Panduan Esensial",
      slug: "perlindungan-merek-digital",
      category: "Intellectual Property",
      date: "2025-12-28",
      summary: "Memahami pentingnya melindungi merek Anda di pasar yang semakin digital.",
      content: "Full content...",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
      status: "Published",
      featured: false
    },
    {
      id: 3,
      title: "Pembaruan Hukum Pajak 2026 untuk Perseroan Terbatas",
      slug: "hukum-pajak-2026",
      category: "Corporate Law",
      date: "2025-12-20",
      summary: "Tetap terinformasi tentang perubahan hukum pajak terbaru yang mempengaruhi PT.",
      content: "Full content...",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200",
      status: "Draft",
      featured: false
    }
  ]);

  // Mock Data: Documents
  const [documents, setDocuments] = useState([
    {
      id: 1,
      code: "DOC-2026-001",
      clientName: "PT. Sinar Maju Jaya",
      type: "Notarial Deed",
      issueDate: "2026-01-15",
      status: "Valid",
      fileName: "deed-smj-001.pdf"
    },
    {
      id: 2,
      code: "DOC-2026-002",
      clientName: "Budi Santoso",
      type: "Power of Attorney",
      issueDate: "2026-01-20",
      status: "Valid",
      fileName: "poa-budi-002.pdf"
    },
    {
      id: 3,
      code: "DOC-2025-156",
      clientName: "CV. Abadi Makmur",
      type: "Contract Agreement",
      issueDate: "2025-11-10",
      status: "Revoked",
      fileName: "contract-abadi-revoked.pdf"
    }
  ]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'news', icon: Newspaper, label: 'Manage News' },
    { id: 'verification', icon: ShieldCheck, label: 'Document Verification' },
    { id: 'settings', icon: Settings, label: 'Site Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#191919] text-white rounded-md shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#191919] text-white flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-center lg:justify-start gap-3">
            <div className="w-8 h-8 bg-[#AE8737] rounded-sm flex items-center justify-center font-bold text-[#191919]">M</div>
            <div>
              <h1 className="text-lg font-bold text-[#AE8737] tracking-wide">ADMIN PANEL</h1>
              <p className="text-xs text-slate-400">M.A.S. Law Firm</p>
            </div>
          </div>
          
          <nav className="p-4 mt-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-[#AE8737] text-white font-medium shadow-md shadow-[#AE8737]/20'
                          : 'text-slate-400 hover:bg-[#2a2a2a] hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="p-4 border-t border-[#2a2a2a] bg-[#1a1a1a]">
          <div className="px-4 py-3 mb-4 rounded-lg bg-[#252525] border border-[#333]">
            <p className="text-xs text-slate-500 mb-1">Logged in as</p>
            <p className="text-sm font-medium text-white truncate">admin@maslaw.com</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-screen w-full">
        <div className="max-w-7xl mx-auto pb-12">
          {activeTab === 'dashboard' && (
            <DashboardOverview articles={newsArticles} documents={documents} />
          )}
          
          {activeTab === 'news' && (
            <ManageNews articles={newsArticles} setArticles={setNewsArticles} />
          )}
          
          {activeTab === 'verification' && (
            <DocumentVerification documents={documents} setDocuments={setDocuments} />
          )}
          
          {activeTab === 'settings' && (
            <SiteSettings />
          )}
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
