import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, X, Upload, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../../lib/supabase';

export function DocumentVerification() {
  const [documents, setDocuments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    clientName: '',
    type: 'Notarial Deed',
    issueDate: new Date().toISOString().split('T')[0],
    status: 'Valid',
    file_url: ''
  });

  const docTypes = [
    'Notarial Deed',
    'Legal Opinion',
    'Contract Agreement',
    'Power of Attorney',
    'Court Decision',
    'Memorandum of Understanding'
  ];

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('issueDate', { ascending: false });

    if (!error) setDocuments(data || []);
  };

  // ======================
  // INPUT CHANGE
  // ======================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ======================
  // FILE UPLOAD
  // ======================
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Only PDF allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Max file size 5MB');
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (error) {
      alert('Upload failed');
      return;
    }

    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    setFormData(prev => ({
      ...prev,
      file_url: data.publicUrl
    }));
  };

  // ======================
  // SAVE
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (editingDoc) {
      await supabase
        .from('documents')
        .update(formData)
        .eq('id', editingDoc.id);
    } else {
      await supabase
        .from('documents')
        .insert([formData]);
    }

    setLoading(false);
    setShowForm(false);
    setEditingDoc(null);
    resetForm();
    fetchDocuments();
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (doc) => {
    setFormData(doc);
    setEditingDoc(doc);
    setShowForm(true);
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return;

    await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    fetchDocuments();
  };

  // ======================
  const resetForm = () => {
    setFormData({
      code: '',
      clientName: '',
      type: 'Notarial Deed',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Valid',
      file_url: ''
    });
  };

  // ======================
  // FILTER
  // ======================
  const filteredDocs = documents.filter(doc => {
    const matchSearch =
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === 'All' || doc.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // ======================
  // UI
  // ======================
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Document Verification</h2>
          <p className="text-slate-500 text-sm">Manage and verify legal documents</p>
        </div>

        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#AE8737] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Document Code"
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Client Name"
                className="w-full border p-2 rounded"
                required
              />

              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                {docTypes.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              >
                <option>Valid</option>
                <option>Revoked</option>
              </select>

              {/* Upload */}
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
              />

              {formData.file_url && (
                <a
                  href={formData.file_url}
                  target="_blank"
                  className="text-blue-600 text-sm"
                >
                  Preview uploaded file
                </a>
              )}

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      )}

      {/* SEARCH + FILTER */}
      <Card>
        <CardContent className="p-6 space-y-4">

          <input
            placeholder="Search code or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            {['All', 'Valid', 'Revoked'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded ${
                  statusFilter === s
                    ? 'bg-[#AE8737] text-white'
                    : 'bg-slate-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* TABLE */}
          <table className="w-full mt-4">
            <thead>
              <tr className="text-left border-b">
                <th>Code</th>
                <th>Client</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id} className="border-b">
                  <td>{doc.code}</td>
                  <td>{doc.clientName}</td>
                  <td>
                    {doc.status === 'Valid'
                      ? <span className="text-green-600">Valid</span>
                      : <span className="text-red-600">Revoked</span>}
                  </td>

                  <td className="text-right space-x-2">
                    {doc.file_url && (
                      <a href={doc.file_url} target="_blank">
                        <Eye className="inline w-4 h-4 text-blue-600" />
                      </a>
                    )}

                    <Edit2
                      className="inline w-4 h-4 cursor-pointer"
                      onClick={() => handleEdit(doc)}
                    />

                    <Trash2
                      className="inline w-4 h-4 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(doc.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </CardContent>
      </Card>

    </div>
  );
}