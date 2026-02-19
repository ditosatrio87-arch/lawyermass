import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, FileText, CheckCircle, XCircle, Upload, Eye } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function DocumentVerification({ documents, setDocuments }) {
  const [showForm, setShowForm] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    code: '',
    clientName: '',
    type: 'Notarial Deed',
    issueDate: new Date().toISOString().split('T')[0],
    status: 'Valid',
    fileName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    // Mock file upload
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDoc) {
      setDocuments(documents.map(d => d.id === editingDoc.id ? { ...formData, id: editingDoc.id } : d));
      setEditingDoc(null);
    } else {
      setDocuments([...documents, { ...formData, id: Date.now() }]);
    }
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (doc) => {
    setFormData(doc);
    setEditingDoc(doc);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this document record?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      clientName: '',
      type: 'Notarial Deed',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Valid',
      fileName: ''
    });
    setEditingDoc(null);
  };

  const filteredDocs = documents.filter(doc => 
    doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const docTypes = [
    'Notarial Deed',
    'Legal Opinion',
    'Contract Agreement',
    'Power of Attorney',
    'Court Decision',
    'Memorandum of Understanding'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#191919]">Document Verification</h2>
          <p className="text-slate-500 text-sm">Manage and verify official legal documents issued by the firm.</p>
        </div>
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)} 
            className="bg-[#AE8737] hover:bg-[#8f6e2d] text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Document
          </Button>
        )}
      </div>

      {showForm && (
        <Card className="mb-8 border-[#AE8737]/30 shadow-md">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#191919]">
                {editingDoc ? 'Edit Document' : 'Add New Document'}
              </h3>
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#191919] mb-1">Document Code</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent font-mono uppercase"
                      placeholder="e.g. DOC-2026-001"
                      required
                    />
                    <p className="text-xs text-slate-400 mt-1">Must be unique for verification purposes.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#191919] mb-1">Client Name</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#191919] mb-1">Document Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                    >
                      {docTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#191919] mb-1">Issue Date</label>
                      <input
                        type="date"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#191919] mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent ${
                          formData.status === 'Valid' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                        }`}
                      >
                        <option value="Valid">Valid</option>
                        <option value="Revoked">Revoked</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#191919] mb-1">Digital Copy (PDF)</label>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className="w-full px-4 py-2 border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2 text-slate-500 transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>{formData.fileName || 'Choose PDF file...'}</span>
                        </div>
                        <input type="file" className="hidden" accept=".pdf" onChange={handleFileUpload} />
                      </label>
                      {formData.fileName && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, fileName: '' }))}
                          className="p-2 hover:bg-red-50 text-red-500 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <Button type="submit" className="bg-[#AE8737] hover:bg-[#8f6e2d] text-white px-6">
                  {editingDoc ? 'Update Document' : 'Create Record'}
                </Button>
                <Button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
                  variant="outline"
                  className="border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by document code or client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE8737] focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left">
                  <th className="py-4 px-4 font-semibold text-slate-600 text-sm">Code</th>
                  <th className="py-4 px-4 font-semibold text-slate-600 text-sm">Client Name</th>
                  <th className="py-4 px-4 font-semibold text-slate-600 text-sm">Type</th>
                  <th className="py-4 px-4 font-semibold text-slate-600 text-sm">Issue Date</th>
                  <th className="py-4 px-4 font-semibold text-slate-600 text-sm">Status</th>
                  <th className="py-4 px-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => (
                    <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm font-medium text-[#191919]">{doc.code}</td>
                      <td className="py-3 px-4 text-[#191919]">{doc.clientName}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{doc.type}</td>
                      <td className="py-3 px-4 text-sm text-slate-500">{doc.issueDate}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'Valid' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {doc.status === 'Valid' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(doc)}
                            className="p-2 hover:bg-slate-100 rounded text-slate-500 hover:text-[#AE8737] transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="p-2 hover:bg-red-50 rounded text-slate-500 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">
                      No documents found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
