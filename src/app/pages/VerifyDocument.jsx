import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, CheckCircle, XCircle, FileText } from 'lucide-react';

export function VerifyDocument() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);

    const { data, error } = await supabase
      .from('documents') // pastikan nama tabel sesuai
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setResult(data);
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[#191919] mb-3">
            Verifikasi Dokumen
          </h1>
          <p className="text-slate-600">
            Masukkan kode dokumen untuk memastikan keaslian dokumen yang diterbitkan oleh MAS Law Firm.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleVerify}
          className="bg-white shadow-lg rounded-xl p-6 mb-8"
        >
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Contoh: DOC-2026-001"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737]"
              required
            />
            <button
              type="submit"
              className="bg-[#AE8737] hover:bg-[#8f6e2d] text-white px-6 rounded-lg flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Cek
            </button>
          </div>
        </form>

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-500">
            Memverifikasi...
          </div>
        )}

        {/* Not Found */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="font-semibold text-red-700">
              Dokumen tidak ditemukan
            </h3>
            <p className="text-sm text-red-600">
              Pastikan kode yang dimasukkan benar.
            </p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white shadow-xl rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold text-green-700">
                Dokumen Valid
              </h3>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              <p><b>Kode:</b> {result.code}</p>
              <p><b>Nama Klien:</b> {result.clientName}</p>
              <p><b>Jenis Dokumen:</b> {result.type}</p>
              <p><b>Tanggal Terbit:</b> {result.issueDate}</p>
              <p>
                <b>Status:</b>{' '}
                <span className={
                  result.status === 'Valid'
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 font-semibold'
                }>
                  {result.status}
                </span>
              </p>
            </div>

            {result.fileUrl && (
              <a
                href={result.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[#AE8737] font-medium"
              >
                <FileText className="w-4 h-4" />
                Lihat Dokumen
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}