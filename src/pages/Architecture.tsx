import React from 'react';
import { 
  Layers, Server, Database, BrainCircuit, Globe, 
  ShieldCheck, FileText, Activity, ArrowRight, ArrowDown,
  Cpu, Code, Cloud, Lock, Search, FileSignature, BarChart3
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Architecture() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Architecture & AI Workflow</h1>
        <p className="text-slate-500 mt-2 text-lg">Technical architecture of the Intelli-Credit AI credit decisioning platform.</p>
      </header>

      {/* Architecture Overview Diagram */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-2 mb-8">
          <Layers className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900">Architecture Overview</h2>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">User Interface Layer</h3>
                </div>
                <p className="text-sm text-slate-600">Credit officer dashboard and admin panel.</p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-slate-300" />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">API Gateway</h3>
                </div>
                <p className="text-sm text-slate-600">Handles requests between frontend and backend.</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Backend Application Layer</h3>
                </div>
                <p className="text-sm text-slate-600">Business logic and credit evaluation services.</p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-slate-300" />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-blue-900">AI Processing Layer</h3>
                </div>
                <p className="text-sm text-blue-800 relative z-10">Document intelligence models and risk scoring models.</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">Data Storage Layer</h3>
                </div>
                <p className="text-sm text-slate-600">Database storing company data, financial metrics, and reports.</p>
              </div>

              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-slate-300" />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900">External Data Sources</h3>
                </div>
                <p className="text-sm text-slate-600">News sources, legal databases, financial filings.</p>
              </div>
            </div>
          </div>
          
          {/* Connecting Lines (Hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
        </div>
      </div>

      {/* Data Processing Pipeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-900">Data Processing Pipeline</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: 1, title: 'Company Profile Input', icon: Globe },
            { step: 2, title: 'Document Upload and OCR Processing', icon: FileText },
            { step: 3, title: 'AI Financial Data Extraction', icon: BrainCircuit },
            { step: 4, title: 'AI Research Agent External Intelligence', icon: Search },
            { step: 5, title: 'Credit Risk Scoring Model', icon: Activity },
            { step: 6, title: 'Explainable Decision Engine', icon: ShieldCheck },
            { step: 7, title: 'CAM Report Generation', icon: FileSignature },
            { step: 8, title: 'Portfolio Analytics Dashboard', icon: BarChart3 }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 h-full flex flex-col relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-200 text-slate-700 rounded-md">Step {item.step}</span>
                  <item.icon className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
              </div>
              {index < 7 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-300 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Model Components */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">AI Model Components</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Document Intelligence Model</h3>
                <p className="text-sm text-slate-600 mt-1">Uses OCR and NLP to extract financial data from unstructured documents.</p>
              </div>
            </div>
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Research Intelligence Model</h3>
                <p className="text-sm text-slate-600 mt-1">Analyzes news sentiment, legal cases, and sector trends.</p>
              </div>
            </div>
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Credit Risk Scoring Model</h3>
                <p className="text-sm text-slate-600 mt-1">Machine learning model calculating creditworthiness.</p>
              </div>
            </div>
            <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Explainable Decision Engine</h3>
                <p className="text-sm text-slate-600 mt-1">Generates transparent reasoning behind loan recommendations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Overview */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-6 h-6 text-slate-700" />
            <h2 className="text-xl font-bold text-slate-900">Technology Stack Overview</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-xl">
              <Globe className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-bold text-slate-900">Frontend</h3>
              <p className="text-sm text-slate-600 mt-1">React + Tailwind Dashboard</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl">
              <Server className="w-6 h-6 text-indigo-500 mb-2" />
              <h3 className="font-bold text-slate-900">Backend</h3>
              <p className="text-sm text-slate-600 mt-1">Python FastAPI Services</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl">
              <BrainCircuit className="w-6 h-6 text-emerald-500 mb-2" />
              <h3 className="font-bold text-slate-900">AI Models</h3>
              <p className="text-sm text-slate-600 mt-1">NLP + Machine Learning Risk Models</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl">
              <Database className="w-6 h-6 text-amber-500 mb-2" />
              <h3 className="font-bold text-slate-900">Database</h3>
              <p className="text-sm text-slate-600 mt-1">PostgreSQL</p>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl sm:col-span-2">
              <Cloud className="w-6 h-6 text-sky-500 mb-2" />
              <h3 className="font-bold text-slate-900">Data Processing</h3>
              <p className="text-sm text-slate-600 mt-1">Cloud-based data pipelines</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Data Flow Visualization */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm p-8 text-white lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <ArrowRight className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold">Data Flow</h2>
          </div>
          <div className="space-y-1">
            {[
              'User Uploads Documents',
              'AI Document Processing',
              'Financial Data Extraction',
              'External Research Analysis',
              'Risk Score Calculation',
              'Loan Recommendation',
              'CAM Report Generation'
            ].map((step, index, arr) => (
              <React.Fragment key={index}>
                <div className="p-3 bg-slate-800 rounded-lg text-sm font-medium text-center border border-slate-700">
                  {step}
                </div>
                {index < arr.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-slate-500" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {/* System Scalability & Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Cloud className="w-5 h-5 text-sky-500" />
                <h3 className="text-lg font-bold text-slate-900">System Scalability</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  Cloud-based architecture enables the system to analyze thousands of companies simultaneously.
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  Distributed AI processing allows large-scale document analysis and research queries.
                </li>
                <li className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  The platform can be integrated with banking systems and regulatory databases.
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-bold text-slate-900">Security & Compliance</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  Data encryption for financial documents
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  Role-based access control
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  Audit logging for credit decisions
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  Compliance with financial data protection standards
                </li>
              </ul>
            </div>
          </div>

          {/* Backend Integration & Database Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900">Backend Integration</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Each service communicates through APIs.</p>
              <div className="space-y-2">
                {['Document Processing Service', 'Research Intelligence Service', 'Credit Scoring Service', 'CAM Generation Service', 'Analytics Service'].map((service, i) => (
                  <div key={i} className="px-3 py-2 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-100">
                    {service}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">Database Structure</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">Show relationships between tables.</p>
              <div className="flex flex-wrap gap-2">
                {['companies', 'documents', 'financial_metrics', 'research_insights', 'risk_scores', 'cam_reports', 'users'].map((table, i) => (
                  <div key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-mono rounded border border-slate-200 flex items-center gap-1.5">
                    <Database className="w-3 h-3 text-slate-400" />
                    {table}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 flex items-center justify-center">
                <p className="text-xs text-slate-500 text-center">
                  Relational schema with <span className="font-mono bg-slate-200 px-1 rounded">company_id</span> as primary foreign key linking all evaluation data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
