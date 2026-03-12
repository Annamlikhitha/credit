import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, FileText, Download, Share2, 
  AlertTriangle, CheckCircle, ShieldAlert, FileOutput
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const steps = [
  { id: 1, name: 'Company Profile', status: 'complete' },
  { id: 2, name: 'Document Upload', status: 'complete' },
  { id: 3, name: 'AI Research Analysis', status: 'complete' },
  { id: 4, name: 'Credit Risk Scoring', status: 'complete' },
  { id: 5, name: 'CAM Report Generation', status: 'current' },
];

type CamReportData = {
  header: {
    company_name: string;
    sector: string;
    loan_requested: string;
    credit_score: number;
    risk_level: string;
    date: string;
  };
  five_cs: {
    character: string;
    capacity: string;
    capital: string;
    collateral: string;
    conditions: string;
  };
  risk_summary: string[];
  recommendation: {
    decision: string;
    amount: string;
    interest_rate: string;
    conditions: string[];
    explanation: string;
  };
};

export function CamReport() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [reportData, setReportData] = useState<CamReportData | null>(null);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call to generate report
      await fetch('/api/generate-cam-report', { method: 'POST' });
      
      // Simulate processing time
      await new Promise(r => setTimeout(r, 2000));
      
      // Fetch results
      const res = await fetch('/api/cam-report');
      const json = await res.json();

      if (json.status === 'success') {
        setReportData(json.data);
        setHasGenerated(true);
      }
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate CAM report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportPdf = async () => {
    try {
      const res = await fetch('/api/export-cam-pdf', { method: 'POST' });
      const json = await res.json();
      if (json.status === 'success') {
        alert('PDF exported successfully! (Simulated download)');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const exportDoc = async () => {
    try {
      const res = await fetch('/api/export-cam-doc', { method: 'POST' });
      const json = await res.json();
      if (json.status === 'success') {
        alert('Word document exported successfully! (Simulated download)');
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const getRiskColor = (level: string) => {
    if (level.includes('Low')) return 'text-emerald-500';
    if (level.includes('Medium') || level.includes('Moderate')) return 'text-amber-500';
    if (level.includes('High')) return 'text-rose-500';
    return 'text-slate-500';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Generated Credit Appraisal Memo</h1>
        <p className="text-slate-500 mt-2 text-lg">Automated CAM report generated using financial analysis, research intelligence, and AI credit scoring.</p>
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

      {!hasGenerated ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center mt-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Generate Credit Appraisal Memo</h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">
            The system will compile financial metrics, research intelligence, and credit scoring data into a formal banking credit assessment document.
          </p>
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 rounded-lg font-medium transition-colors shadow-sm"
          >
            {isGenerating ? (
              <>
                <FileOutput className="w-5 h-5 animate-pulse" />
                Generating Report...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Generate CAM Report
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Document Export Options */}
          <div className="flex flex-wrap gap-4 justify-end">
            <button
              onClick={exportPdf}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download CAM as PDF
            </button>
            <button
              onClick={exportDoc}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Download CAM as Word Document
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              Share Report with Credit Committee
            </button>
          </div>

          {/* Report Preview (Document Viewer Style) */}
          {reportData && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-w-4xl mx-auto">
              {/* Document Header */}
              <div className="px-10 py-8 border-b border-slate-200 bg-slate-50 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">CREDIT APPRAISAL MEMO</h2>
                  <p className="text-sm text-slate-500 font-medium tracking-wider uppercase">Intelli-Credit Evaluation System</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1">Date of Evaluation</p>
                  <p className="font-medium text-slate-900">{reportData.header.date}</p>
                </div>
              </div>

              <div className="p-10 space-y-10">
                {/* CAM Report Header Details */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 pb-8 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Company</p>
                    <p className="text-lg font-medium text-slate-900">{reportData.header.company_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Sector</p>
                    <p className="text-lg font-medium text-slate-900">{reportData.header.sector}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Loan Amount Requested</p>
                    <p className="text-lg font-medium text-slate-900">{reportData.header.loan_requested}</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Credit Score</p>
                      <p className="text-lg font-bold text-blue-600">{reportData.header.credit_score} / 100</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Risk Level</p>
                      <p className={cn("text-lg font-bold", getRiskColor(reportData.header.risk_level))}>
                        {reportData.header.risk_level}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Loan Recommendation Section */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-4 border-b border-emerald-200 pb-2">Final Recommendation</h3>
                  <div className="flex items-start gap-4 mb-6">
                    <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm text-emerald-700 font-medium mb-1">Loan Decision</p>
                      <p className="text-2xl font-bold text-emerald-900">{reportData.recommendation.decision}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-emerald-700 font-medium mb-1">Recommended Loan Amount</p>
                      <p className="text-xl font-bold text-emerald-900">{reportData.recommendation.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium mb-1">Suggested Interest Rate</p>
                      <p className="text-xl font-bold text-emerald-900">{reportData.recommendation.interest_rate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-emerald-800 font-bold mb-2">Conditions Precedent / Subsequent:</p>
                    <ul className="space-y-2">
                      {reportData.recommendation.conditions.map((cond, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-emerald-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{cond}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Explanation Panel */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">AI Decision Explanation</h3>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {reportData.recommendation.explanation}
                  </p>
                </div>

                {/* Five Cs of Credit Analysis */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Five C's of Credit Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg bg-white">
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Character</h4>
                      <p className="text-sm text-slate-600">{reportData.five_cs.character}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg bg-white">
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Capacity</h4>
                      <p className="text-sm text-slate-600">{reportData.five_cs.capacity}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg bg-white">
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Capital</h4>
                      <p className="text-sm text-slate-600">{reportData.five_cs.capital}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg bg-white">
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Collateral</h4>
                      <p className="text-sm text-slate-600">{reportData.five_cs.collateral}</p>
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg bg-white md:col-span-2">
                      <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Conditions</h4>
                      <p className="text-sm text-slate-600">{reportData.five_cs.conditions}</p>
                    </div>
                  </div>
                </div>

                {/* Risk Summary Section */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Risk Summary</h3>
                  <div className="space-y-3">
                    {reportData.risk_summary.map((risk, idx) => {
                      let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
                      if (risk.toLowerCase().includes('high')) badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
                      else if (risk.toLowerCase().includes('moderate')) badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                      
                      return (
                        <div key={idx} className={cn("flex items-start gap-3 p-3 rounded-lg border", badgeColor)}>
                          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium">{risk}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
              
              {/* Document Footer */}
              <div className="px-10 py-6 bg-slate-50 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-400">This document was automatically generated by the Intelli-Credit AI System.</p>
                <p className="text-xs text-slate-400 mt-1">Confidential & Proprietary.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
