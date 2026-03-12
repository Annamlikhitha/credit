import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Circle, Activity, ShieldAlert, 
  TrendingUp, FileText, ArrowRight, RefreshCw, 
  AlertTriangle, CheckCircle, Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

const steps = [
  { id: 1, name: 'Company Profile', status: 'complete' },
  { id: 2, name: 'Document Upload', status: 'complete' },
  { id: 3, name: 'AI Research Analysis', status: 'complete' },
  { id: 4, name: 'Credit Risk Scoring', status: 'current' },
  { id: 5, name: 'CAM Report Generation', status: 'upcoming' },
];

type ScoreData = {
  credit_score: number;
  risk_level: string;
  confidence_level: number;
  explanation: string[];
};

type RatioData = {
  metric: string;
  value: string;
  interpretation: string;
};

type FactorData = {
  name: string;
  score: number;
};

type RadarData = {
  subject: string;
  A: number;
  fullMark: number;
};

type RecommendationData = {
  decision: string;
  amount: string;
  interest_rate: string;
  conditions: string[];
};

export function RiskScoring() {
  const navigate = useNavigate();
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [ratios, setRatios] = useState<RatioData[]>([]);
  const [factors, setFactors] = useState<FactorData[]>([]);
  const [radarData, setRadarData] = useState<RadarData[]>([]);
  const [recommendation, setRecommendation] = useState<RecommendationData | null>(null);

  const calculateScore = async () => {
    setIsCalculating(true);
    try {
      // Simulate API call to calculate score
      const scoreRes = await fetch('/api/calculate-credit-score', { method: 'POST' });
      const scoreJson = await scoreRes.json();
      
      // Simulate processing time
      await new Promise(r => setTimeout(r, 2000));
      
      // Fetch results
      const [ratiosRes, breakdownRes, recRes] = await Promise.all([
        fetch('/api/financial-ratios'),
        fetch('/api/risk-breakdown'),
        fetch('/api/generate-loan-recommendation', { method: 'POST' })
      ]);

      const ratiosJson = await ratiosRes.json();
      const breakdownJson = await breakdownRes.json();
      const recJson = await recRes.json();

      if (scoreJson.status === 'success') setScoreData(scoreJson.data);
      if (ratiosJson.status === 'success') setRatios(ratiosJson.data);
      if (breakdownJson.status === 'success') {
        setFactors(breakdownJson.data.factors);
        setRadarData(breakdownJson.data.radar);
      }
      if (recJson.status === 'success') setRecommendation(recJson.data);
      
      setHasCalculated(true);
    } catch (error) {
      console.error('Calculation failed:', error);
      alert('Failed to calculate credit score. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const getRiskColor = (level: string) => {
    if (level.includes('Low')) return 'text-emerald-500';
    if (level.includes('Medium') || level.includes('Moderate')) return 'text-amber-500';
    if (level.includes('High')) return 'text-rose-500';
    return 'text-slate-500';
  };

  const getRiskBgColor = (level: string) => {
    if (level.includes('Low')) return 'bg-emerald-500';
    if (level.includes('Medium') || level.includes('Moderate')) return 'bg-amber-500';
    if (level.includes('High')) return 'bg-rose-500';
    return 'bg-slate-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // emerald-500
    if (score >= 60) return '#f59e0b'; // amber-500
    return '#f43f5e'; // rose-500
  };

  // Calculate circumference for the gauge
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = scoreData ? circumference - (scoreData.credit_score / 100) * circumference : circumference;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Credit Risk Scoring Engine</h1>
        <p className="text-slate-500 mt-2 text-lg">Machine learning based credit risk assessment using financial data, research insights, and sector indicators.</p>
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

      {!hasCalculated ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center mt-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Calculate Credit Risk Score</h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8">
            The AI engine will analyze financial statements, research insights, and sector trends to generate a comprehensive credit score and lending recommendation.
          </p>
          <button
            onClick={calculateScore}
            disabled={isCalculating}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 rounded-lg font-medium transition-colors shadow-sm"
          >
            {isCalculating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Calculating Score...
              </>
            ) : (
              <>
                <Activity className="w-5 h-5" />
                Calculate Credit Score
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Score Overview & Recommendation */}
            <div className="space-y-8">
              {/* Credit Score Overview */}
              {scoreData && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-center p-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-6">Credit Score Overview</h3>
                  
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    {/* Gauge Background */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                      <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      {/* Gauge Progress */}
                      <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        stroke={getScoreColor(scoreData.credit_score)}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-slate-900">{scoreData.credit_score}</span>
                      <span className="text-sm text-slate-500">/ 100</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-slate-500 mb-1">Risk Level</p>
                    <p className={cn("text-xl font-bold", getRiskColor(scoreData.risk_level))}>
                      {scoreData.risk_level}
                    </p>
                  </div>
                </div>
              )}

              {/* Decision Confidence Score */}
              {scoreData && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-slate-900">Model Confidence Level</h3>
                    <span className="text-sm font-bold text-blue-600">{scoreData.confidence_level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${scoreData.confidence_level}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Loan Recommendation Panel */}
              {recommendation && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h3 className="text-lg font-semibold text-slate-900">Loan Recommendation</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-sm text-emerald-700 font-medium">Loan Decision</p>
                        <p className="text-lg font-bold text-emerald-900">{recommendation.decision}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1">Recommended Amount</p>
                        <p className="text-xl font-bold text-slate-900">{recommendation.amount}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-1">Suggested Interest Rate</p>
                        <p className="text-xl font-bold text-slate-900">{recommendation.interest_rate}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">Conditions:</h4>
                      <ul className="space-y-2">
                        {recommendation.conditions.map((condition, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <span>{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Breakdown & Analysis */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Risk Factor Breakdown & Radar */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-lg font-semibold text-slate-900">Risk Factor Breakdown</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Bar Chart */}
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={factors} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={20}>
                          {factors.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Radar Chart */}
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Risk Profile" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              </div>

              {/* Financial Ratio Analysis */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-lg font-semibold text-slate-900">Financial Ratio Analysis</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ratios.map((ratio, idx) => (
                    <div key={idx} className="p-4 border border-slate-100 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-slate-500">{ratio.metric}</p>
                        <p className="text-lg font-bold text-slate-900">{ratio.value}</p>
                      </div>
                      <div className="flex items-start gap-2 mt-2 pt-2 border-t border-slate-200/60">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600">{ratio.interpretation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Model Decision Explanation */}
              {scoreData && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-500" />
                    <h3 className="text-lg font-semibold text-slate-900">Explainable AI Decision</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {scoreData.explanation.map((exp, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={calculateScore}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Recalculate Credit Score
                </button>
                <button
                  onClick={() => navigate('/cam-generator')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Proceed to CAM Report Generation
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
