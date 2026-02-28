import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout & Components
import { Layout } from './components/Layout.tsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

// Public Pages
import { Beranda } from './pages/Beranda.jsx';
import { Berita } from './pages/Berita.jsx';
import { NewsDetail } from './pages/NewsDetail.jsx';
import { Portofolio } from './pages/Portofolio.jsx';
import { TimPengacara } from './pages/TimPengacara.jsx';
import { LayananKami } from './pages/LayananKami.jsx';
import { Kontak } from './pages/Kontak.jsx';
import { VerifyDocument } from './pages/VerifyDocument.jsx';
import { Sitemap } from './pages/Sitemap.jsx';
import { ManajerOperasional } from './pages/ManajerOperasional.jsx';
import { StafKaryawan } from './pages/StafKaryawan.jsx';

// Auth
import { Login } from './pages/Login.tsx';

// Admin Pages
import { Admin } from './pages/Admin.jsx';
import { ManageNews } from './pages/ManageNews.jsx';
import { DocumentVerification } from './pages/admin/DocumentVerification.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN (PROTECTED) ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/news"
          element={
            <ProtectedRoute>
              <ManageNews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/document-verification"
          element={
            <ProtectedRoute>
              <DocumentVerification />
            </ProtectedRoute>
          }
        />

        {/* ================= PUBLIC (WITH LAYOUT) ================= */}
        <Route
          path="/"
          element={
            <Layout>
              <Beranda />
            </Layout>
          }
        />

        <Route
          path="/berita"
          element={
            <Layout>
              <Berita />
            </Layout>
          }
        />

        <Route
          path="/news/:slug"
          element={
            <Layout>
              <NewsDetail />
            </Layout>
          }
        />

        <Route
          path="/portofolio"
          element={
            <Layout>
              <Portofolio />
            </Layout>
          }
        />

        <Route
          path="/tim-pengacara"
          element={
            <Layout>
              <TimPengacara />
            </Layout>
          }
        />

        <Route
          path="/manajer-operasional"
          element={
            <Layout>
              <ManajerOperasional />
            </Layout>
          }
        />

        <Route
          path="/staf-karyawan"
          element={
            <Layout>
              <StafKaryawan />
            </Layout>
          }
        />

        <Route
          path="/layanan-kami"
          element={
            <Layout>
              <LayananKami />
            </Layout>
          }
        />

        <Route
          path="/kontak"
          element={
            <Layout>
              <Kontak />
            </Layout>
          }
        />

        <Route
          path="/verify"
          element={
            <Layout>
              <VerifyDocument />
            </Layout>
          }
        />

        <Route
          path="/sitemap"
          element={
            <Layout>
              <Sitemap />
            </Layout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}