'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, AlertCircle } from 'lucide-react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { getDocuments, createDocument, updateDocument, deleteDocument, Document } from '../../lib/database';

export default function DocumentsPage() {
  return (
    <ProtectedRoute>
      <DocumentsContent />
    </ProtectedRoute>
  );
}

function DocumentsContent() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
  });

  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user]);

  const loadDocuments = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await getDocuments(user.id);
      setDocuments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.title.trim()) return;

    try {
      if (editingId) {
        const updated = await updateDocument(editingId, {
          ...formData,
          user_id: user.id,
        });
        setDocuments(documents.map(d => d.id === editingId ? updated : d));
        setEditingId(null);
      } else {
        const newDoc = await createDocument({
          ...formData,
          user_id: user.id,
        });
        setDocuments([newDoc, ...documents]);
      }
      setFormData({ title: '', content: '', category: 'general' });
      setShowForm(false);
      setSelectedDoc(null);
      setError(null);
    } catch (err) {
      setError('Failed to save document');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteDocument(id);
      setDocuments(documents.filter(d => d.id !== id));
      if (selectedDoc?.id === id) setSelectedDoc(null);
    } catch (err) {
      setError('Failed to delete document');
      console.error(err);
    }
  };

  const handleEdit = (doc: Document) => {
    setFormData({
      title: doc.title,
      content: doc.content || '',
      category: doc.category,
    });
    setEditingId(doc.id);
    setShowForm(true);
    setSelectedDoc(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Documents</h1>
          <p className="text-gray-400">Create and manage your notes and documents</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Documents List */}
          <div className="lg:col-span-1">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({ title: '', content: '', category: 'general' });
                setSelectedDoc(null);
              }}
              className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={20} />
              New Document
            </button>

            {loading ? (
              <div className="text-center py-8">
                <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Loading...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-8 bg-slate-800/30 border border-slate-700 rounded-lg">
                <p className="text-gray-400 text-sm">No documents yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc);
                      setShowForm(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedDoc?.id === doc.id
                        ? 'bg-blue-600/30 border border-blue-500'
                        : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <h3 className="font-semibold text-white truncate">{doc.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{doc.category}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Document Editor/Viewer */}
          <div className="lg:col-span-2">
            {showForm ? (
              <form onSubmit={handleSubmit} className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg h-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Document title..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="ideas">Ideas</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your document content here..."
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={12}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingId ? 'Update Document' : 'Create Document'}
                </button>
              </form>
            ) : selectedDoc ? (
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedDoc.title}</h2>
                    <p className="text-sm text-gray-400 mt-1">{selectedDoc.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(selectedDoc)}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedDoc.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedDoc.content}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Created: {new Date(selectedDoc.created_at).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg h-full flex items-center justify-center">
                <p className="text-gray-400">Select a document or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
