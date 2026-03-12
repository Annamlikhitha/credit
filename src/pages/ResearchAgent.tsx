import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, Search, Newspaper, Scale, 
  TrendingUp, UserCheck, AlertTriangle, ArrowRight, 
  RefreshCw, ShieldAlert, Activity, Globe
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const steps = [
  { id: 1, name: 'Company Profile', status: 'complete' },
  { id: 2, name: 'Document Upload', status: 'complete' },
  { id: 3, name: 'AI Research Analysis', status: 'current' },
  { id: 4, name: 'Credit Risk Scoring', status: 'upcoming' },
  { id: 5, name: 'CAM Report Generation', status: 'upcoming' },
];

type NewsItem = {
  id: number;
  title: string;
  source: string;
  publication_date: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
};

type LegalCase = {
  id: number;
  case_title: string;
  court: string;
  status: string;
  risk_impact: 'Low Risk' | 'Moderate Risk' | 'High Risk';
};

type SectorAnalysis = {
  sector: string;
  industry_growth: string;
  regulatory_risk: string;
  market_volatility: string;
};

export function ResearchAgent() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [legalCases, setLegalCases] = useState<LegalCase[]>([]);
  const [sectorAnalysis, setSectorAnalysis] = useState<SectorAnalysis | null>(null);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call to run research agent
      await fetch('/api/run-research-agent', { method: 'POST' });
      
      // Simulate processing time
      await new Promise(r => setTimeout(r, 2000));
      
      // Fetch results
      const [newsRes, legalRes, sectorRes] = await Promise.all([
        fetch('/api/company-news'),
        fetch('/api/legal-records'),
        fetch('/api/sector-risk-analysis')
      ]);

      const newsData = await newsRes.json();
      const legalData = await legalRes.json();
      const sectorData = await sectorRes.json();

      if (newsData.status === 'success') setNews(newsData.data);
      if (legalData.status === 'success') setLegalCases(legalData.data);
      if (sectorData.status === 'success') setSectorAnalysis(sectorData.data);
      
      setHasAnalyzed(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to run research analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive': return 'bg-emerald-100 text-emerald-700';
      case 'Neutral': return 'bg-slate-100 text-slate-700';
      case 'Negative': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low Risk': return 'bg-emerald-100 text-emerald-700';
      case 'Moderate Risk': return 'bg-amber-100 text-amber-700';
      case 'High Risk': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Research Intelligence</h1>
        <p className="text-slate-500 mt-2 text-lg">Automated research of company background, promoter activity, sector trends, and legal risks.</p>
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

      {!hasAnalyzed ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center mt-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Start External Intelligence Gathering</h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">
            The AI Research Agent will scan millions of news articles, court records, and regulatory filings to build a comprehensive risk profile.
          </p>
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 rounded-lg font-medium transition-colors shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Gathering Intelligence...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Run Research Analysis
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Research Overview Panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <Newspaper className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">News Articles Found</p>
                <p className="text-2xl font-bold text-slate-900">12</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Legal Cases Detected</p>
                <p className="text-2xl font-bold text-slate-900">2</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Sector Risk Level</p>
                <p className="text-2xl font-bold text-slate-900">Medium</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Promoter Risk Index</p>
                <p className="text-2xl font-bold text-slate-900">Low</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* News Intelligence Section */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">News Intelligence</h3>
                </div>
                <div className="p-0">
                  <ul className="divide-y divide-slate-100">
                    {news.map((item) => (
                      <li key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-base font-medium text-slate-900 mb-1">{item.title}</h4>
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                              <span>Source: {item.source}</span>
                              <span>•</span>
                              <span>{new Date(item.publication_date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getSentimentColor(item.sentiment))}>
                            {item.sentiment}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Legal Dispute Detection */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Legal Dispute Detection</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-3 font-medium">Case Title</th>
                        <th className="px-6 py-3 font-medium">Court</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium">Risk Impact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {legalCases.map((caseItem) => (
                        <tr key={caseItem.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-900">{caseItem.case_title}</td>
                          <td className="px-6 py-4 text-slate-600">{caseItem.court}</td>
                          <td className="px-6 py-4 text-slate-600">{caseItem.status}</td>
                          <td className="px-6 py-4">
                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getRiskColor(caseItem.risk_impact))}>
                              {caseItem.risk_impact}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Research Timeline */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Research Timeline</h3>
                </div>
                <div className="p-6">
                  <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                      <p className="text-sm font-bold text-slate-900">2025</p>
                      <p className="text-sm text-slate-600 mt-1">Industry demand slowdown reported in major financial outlets.</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                      <p className="text-sm font-bold text-slate-900">2024</p>
                      <p className="text-sm text-slate-600 mt-1">Litigation filed by supplier XYZ Logistics regarding payment delays.</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                      <p className="text-sm font-bold text-slate-900">2023</p>
                      <p className="text-sm text-slate-600 mt-1">Company revenue increased 18% following new government contracts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* AI Risk Alerts Panel */}
              <div className="bg-white rounded-xl border border-rose-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-rose-100 bg-rose-50 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <h3 className="text-lg font-semibold text-rose-900">AI Risk Alerts</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-rose-50/50 rounded-lg border border-rose-100">
                    <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Negative news about industry slowdown</p>
                      <p className="text-xs text-slate-500 mt-1">Detected in recent publications affecting the sector outlook.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Two pending litigation cases</p>
                      <p className="text-xs text-slate-500 mt-1">Including one High Court case with State Tax Department.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">High regulatory risk in sector</p>
                      <p className="text-xs text-slate-500 mt-1">New environmental compliance laws pending.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sector Risk Analysis */}
              {sectorAnalysis && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-slate-500" />
                    <h3 className="text-lg font-semibold text-slate-900">Sector Risk Analysis</h3>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <p className="text-sm text-slate-500">Sector</p>
                      <p className="text-lg font-semibold text-slate-900">{sectorAnalysis.sector}</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Industry Growth</span>
                          <span className="font-medium text-slate-900">{sectorAnalysis.industry_growth}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-1/2" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Regulatory Risk</span>
                          <span className="font-medium text-slate-900">{sectorAnalysis.regulatory_risk}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 w-2/3" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Market Volatility</span>
                          <span className="font-medium text-slate-900">{sectorAnalysis.market_volatility}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 w-4/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promoter Risk Analysis */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Promoter Risk Analysis</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <p className="text-sm text-slate-500">Promoter Risk Score</p>
                      <p className="text-3xl font-bold text-emerald-600">78<span className="text-lg text-slate-400">/100</span></p>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-600 font-bold text-xl">
                      A-
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-900">Key Findings:</p>
                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
                      <li>No major personal legal disputes found.</li>
                      <li>Strong past business experience in manufacturing.</li>
                      <li>Previous ventures show stable financial history.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={runAnalysis}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-run Research Analysis
                </button>
                <button
                  onClick={() => navigate('/risk-scoring')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Proceed to Credit Risk Scoring
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
