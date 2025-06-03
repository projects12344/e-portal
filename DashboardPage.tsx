import React, { useState } from 'react';
import { LucideUpload, LucideFile, LucideTrash2, LucideDownload, LucideLogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useUser } from '../context/UserContext';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

const DashboardPage: React.FC = () => {
  const { user, logout } = useUser();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString()
      };

      setDocuments(prev => [newDoc, ...prev]);
      setIsUploading(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="Document Management System" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.username || 'Citizen'}</h1>
            <p className="text-gray-600">Aadhar: {user?.aadharNumber}</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LucideLogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex flex-col items-center"
            >
              <LucideUpload className="h-12 w-12 text-gray-400 mb-3" />
              <span className="text-lg font-medium text-gray-900 mb-1">Upload Documents</span>
              <span className="text-sm text-gray-500">
                Drag and drop or click to select files
              </span>
              <span className="text-xs text-gray-400 mt-2">
                Supported formats: PDF, DOC, DOCX, JPG, PNG
              </span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Documents</h2>
          </div>
          
          {documents.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <LucideFile className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium">No documents uploaded yet</p>
              <p className="text-sm">Upload your first document to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {documents.map(doc => (
                <div key={doc.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center">
                    <LucideFile className="h-8 w-8 text-blue-500 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                      <p className="text-xs text-gray-500">
                        {doc.size} • Uploaded on {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="Download"
                    >
                      <LucideDownload className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => handleDelete(doc.id)}
                      title="Delete"
                    >
                      <LucideTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;