import { UploadCloud, Bot, FileSignature } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
        <p className="text-sm text-slate-500">Frequently used tools and workflows</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/document-ai')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium transition-colors border border-blue-200"
        >
          <UploadCloud className="w-5 h-5" />
          Upload Company Documents
        </button>
        <button
          onClick={() => navigate('/research-agent')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-medium transition-colors border border-indigo-200"
        >
          <Bot className="w-5 h-5" />
          Start AI Analysis
        </button>
        <button
          onClick={() => navigate('/cam-generator')}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-medium transition-colors border border-emerald-200"
        >
          <FileSignature className="w-5 h-5" />
          Generate CAM Report
        </button>
      </div>
    </div>
  );
}
