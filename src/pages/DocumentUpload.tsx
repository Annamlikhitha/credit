import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, UploadCloud, FileText, Trash2, 
  Play, ArrowRight, FileImage, FileSpreadsheet, Eye, 
  AlertTriangle, ShieldCheck, AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const steps = [
  { id: 1, name: 'Company Profile', status: 'complete' },
  { id: 2, name: 'Document Upload', status: 'current' },
  { id: 3, name: 'AI Data Extraction', status: 'upcoming' },
  { id: 4, name: 'Risk Scoring', status: 'upcoming' },
  { id: 5, name: 'CAM Report', status: 'upcoming' },
];

const documentCategories = [
  'Annual Reports',
  'Bank Statements',
  'GST Filings',
  'Financial Statements',
  'Legal Documents',
  'Loan Sanction Letters'
];

type UploadedDoc = {
  id: string;
  name: string;
  type: string;
  category: string;
  status: 'Uploaded' | 'OCR Processing' | 'Data Extraction' | 'Financial Analysis' | 'Complete';
  progress: number;
};

type Insights = {
  metrics: {
    revenue: string;
    profit: string;
    debt: string;
    debt_equity_ratio: string;
    operating_margin: string;
  };
  commitments: { type: string; value: string }[];
  risks: { flag: string; level: string; message: string }[];
} | null;

export function DocumentUpload() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(documentCategories[0]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [insights, setInsights] = useState<Insights>(null);
  const [previewDoc, setPreviewDoc] = useState<UploadedDoc | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newDocs: UploadedDoc[] = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Spreadsheet',
      category: selectedCategory,
      status: 'Uploaded',
      progress: 0
    }));
    setDocuments(prev => [...prev, ...newDocs]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const startExtraction = async () => {
    if (documents.length === 0) {
      alert('Please upload documents first.');
      return;
    }

    setIsExtracting(true);
    
    try {
      // Simulate API call to start extraction
      await fetch('/api/extract-financial-data', { method: 'POST' });
      
      // Simulate progress updates
      setDocuments(prev => prev.map(d => ({ ...d, status: 'OCR Processing', progress: 25 })));
      await new Promise(r => setTimeout(r, 1500));
      
      setDocuments(prev => prev.map(d => ({ ...d, status: 'Data Extraction', progress: 60 })));
      await new Promise(r => setTimeout(r, 1500));
      
      setDocuments(prev => prev.map(d => ({ ...d, status: 'Financial Analysis', progress: 90 })));
      await new Promise(r => setTimeout(r, 1500));
      
      setDocuments(prev => prev.map(d => ({ ...d, status: 'Complete', progress: 100 })));
      
      // Fetch insights
      const res = await fetch('/api/document-insights');
      const data = await res.json();
      if (data.status === 'success') {
        setInsights(data.data);
      }
    } catch (error) {
      console.error('Extraction failed:', error);
      alert('Failed to extract data. Please try again.');
    } finally {
      setIsExtracting(false);
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-6 h-6 text-red-500" />;
      case 'Image': return <FileImage className="w-6 h-6 text-blue-500" />;
      case 'Spreadsheet': return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
      default: return <FileText className="w-6 h-6 text-slate-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Green': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Yellow': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Red': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Green': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Yellow': return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'Red': return <AlertCircle className="w-5 h-5 text-rose-600" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Upload Company Financial Documents</h1>
        <p className="text-slate-500 mt-2 text-lg">Upload financial and legal documents for AI-based analysis and data extraction.</p>
      </header>

      {/* Workflow Indicator */}
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={cn("h-0.5 w-full", step.status === 'complete' ? "bg-blue-600" : "bg-slate-200")} />
              </div>
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full",
                  step.status === 'complete' ? "bg-blue-600" : 
                  step.status === 'current' ? "bg-blue-600 ring-4 ring-blue-100" : "bg-white border-2 border-slate-300"
                )}
              >
                {step.status === 'complete' ? (
                  <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                ) : step.status === 'current' ? (
                  <Circle className="h-3 w-3 text-white" aria-hidden="true" />
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                )}
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-500 whitespace-nowrap">
                Step {step.id} - {step.name}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Document Upload Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Upload Company Documents</h3>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {documentCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="p-6">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer",
                  isDragging ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  multiple 
                  accept=".pdf,.csv,.xlsx,.xls,image/*"
                  onChange={handleFileInput}
                />
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-medium text-slate-900 mb-2">Drag & drop files here</h4>
                <p className="text-sm text-slate-500 mb-4">or click to browse from your computer</p>
                <p className="text-xs text-slate-400">Supported formats: PDF, Excel, CSV, Scanned Documents (Images)</p>
              </div>

              {/* Uploaded Documents List */}
              {documents.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-slate-900 mb-4">Uploaded Documents</h4>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                          {getFileIcon(doc.type)}
                          <div>
                            <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{doc.category}</span>
                              <span className="text-xs text-slate-500">{doc.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xs font-medium text-slate-700 mb-1">Status: {doc.status}</p>
                            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full transition-all duration-500", doc.progress === 100 ? "bg-emerald-500" : "bg-blue-500")}
                                style={{ width: `${doc.progress}%` }}
                              />
                            </div>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setPreviewDoc(doc); }}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Preview Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeDocument(doc.id); }}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                            title="Remove Document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Document Intelligence Section */}
          {insights && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-lg font-semibold text-slate-900">AI Document Insights</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Total Revenue</p>
                      <p className="text-xl font-bold text-slate-900">{insights.metrics.revenue}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Net Profit</p>
                      <p className="text-xl font-bold text-slate-900">{insights.metrics.profit}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Total Debt</p>
                      <p className="text-xl font-bold text-slate-900">{insights.metrics.debt}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Debt to Equity</p>
                      <p className="text-xl font-bold text-slate-900">{insights.metrics.debt_equity_ratio}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-xs font-medium text-slate-500 mb-1">Operating Margin</p>
                      <p className="text-xl font-bold text-slate-900">{insights.metrics.operating_margin}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Financial Commitments */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-base font-semibold text-slate-900">Financial Commitments Detection</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {insights.commitments.map((item, idx) => (
                        <li key={idx} className="flex flex-col gap-1 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                          <span className="text-xs font-medium text-slate-500">{item.type}</span>
                          <span className="text-sm font-medium text-slate-900">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Risk Indicators */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-base font-semibold text-slate-900">Risk Indicators from Documents</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-4">
                      {insights.risks.map((risk, idx) => (
                        <li key={idx} className={cn("p-4 rounded-lg border", getRiskColor(risk.level))}>
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {getRiskIcon(risk.level)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{risk.flag}</p>
                              <p className="text-xs mt-1 opacity-90">{risk.message}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-semibold text-slate-900">Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <button
                onClick={startExtraction}
                disabled={isExtracting || documents.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                {isExtracting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Extracting Data...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start AI Extraction
                  </>
                )}
              </button>
              <button
                onClick={() => navigate('/research-agent')}
                disabled={!insights}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Proceed to Research Analysis
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview Modal (Simplified for prototype) */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                {getFileIcon(previewDoc.type)}
                <h3 className="text-lg font-semibold text-slate-900">{previewDoc.name}</h3>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-600">
                <Trash2 className="w-5 h-5" /> {/* Using Trash2 as a placeholder for close, let's use a proper close icon if available, or just text */}
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto bg-slate-100 flex items-center justify-center">
              <div className="bg-white p-12 shadow-sm w-full max-w-2xl border border-slate-200 min-h-[600px] relative">
                <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded border border-amber-200">
                  AI Highlight Mode Active
                </div>
                <h1 className="text-2xl font-bold mb-8 text-center">Financial Statement 2024</h1>
                <div className="space-y-6">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-600">Revenue</span>
                    <span className="font-bold bg-yellow-200 px-1 rounded">$45.2M</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-600">Operating Expenses</span>
                    <span>$32.1M</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-600">Net Profit</span>
                    <span className="font-bold bg-yellow-200 px-1 rounded">$8.4M</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 mt-8">
                    <span className="text-slate-600">Total Assets</span>
                    <span>$120.5M</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-600">Total Liabilities</span>
                    <span className="font-bold bg-yellow-200 px-1 rounded">$12.1M</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
