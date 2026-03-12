import React from 'react';
import { 
  BarChart3, TrendingUp, PieChart, Activity, 
  AlertTriangle, ArrowUpRight, ArrowDownRight, 
  Download, Filter, Building2, ShieldAlert,
  FileSignature, PlayCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

// --- MOCK DATA ---
const summary = {
  total_companies: { value: 146, trend: '+12%', trendUp: true },
  total_approved: { value: 92, trend: '+8%', trendUp: true },
  total_rejected: { value: 28, trend: '-2%', trendUp: false },
  high_risk_companies: { value: 26, trend: '+5%', trendUp: false }
};

const riskDistributionData = [
  { name: 'Low Risk', count: 45, fill: '#10b981' },
  { name: 'Medium Risk', count: 68, fill: '#f59e0b' },
  { name: 'High Risk', count: 33, fill: '#ef4444' },
];

const sectorRiskData = [
  { name: 'Manufacturing', score: 62 },
  { name: 'Retail', score: 45 },
  { name: 'Technology', score: 28 },
  { name: 'Infrastructure', score: 75 },
  { name: 'Healthcare', score: 35 },
];

const loanDecisionsData = [
  { name: 'Approved', value: 92, fill: '#10b981' },
  { name: 'Rejected', value: 28, fill: '#ef4444' },
  { name: 'Conditional Approval', value: 26, fill: '#f59e0b' },
];

const highRiskAlerts = [
  { id: 1, name: 'XYZ Infrastructure', score: 42, reason: 'High Debt Ratio' },
  { id: 2, name: 'Omega Textiles', score: 38, reason: 'Legal Dispute Risk' },
  { id: 3, name: 'Global Logistics', score: 45, reason: 'Declining Profit Margins' },
];

const riskTrendsData = [
  { month: 'Jan', score: 52 },
  { month: 'Feb', score: 54 },
  { month: 'Mar', score: 51 },
  { month: 'Apr', score: 58 },
  { month: 'May', score: 62 },
  { month: 'Jun', score: 59 },
];

const portfolioExposureData = [
  { name: 'Manufacturing', exposure: 120 },
  { name: 'Infrastructure', exposure: 90 },
  { name: 'Retail', exposure: 45 },
  { name: 'Technology', exposure: 85 },
  { name: 'Healthcare', exposure: 60 },
];

const recentEvaluations = [
  { id: 1, name: 'ABC Manufacturing Ltd', sector: 'Steel', score: 72, risk: 'Medium Risk', decision: 'Approved with Conditions', date: 'Today' },
  { id: 2, name: 'TechNova Solutions', sector: 'Technology', score: 88, risk: 'Low Risk', decision: 'Approved', date: 'Yesterday' },
  { id: 3, name: 'XYZ Infrastructure', sector: 'Infrastructure', score: 42, risk: 'High Risk', decision: 'Rejected', date: '2 days ago' },
  { id: 4, name: 'Omega Textiles', sector: 'Retail', score: 38, risk: 'High Risk', decision: 'Rejected', date: '3 days ago' },
  { id: 5, name: 'MediCare Plus', sector: 'Healthcare', score: 81, risk: 'Low Risk', decision: 'Approved', date: '4 days ago' },
];

export function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Credit Portfolio Analytics</h1>
          <p className="text-slate-500 mt-2 text-lg">Real-time monitoring of corporate credit risk and lending decisions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </header>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Building2 className="w-5 h-5" />
            </div>
            <span className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full", summary.total_companies.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
              {summary.total_companies.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {summary.total_companies.trend}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Companies Evaluated</p>
          <p className="text-3xl font-bold text-slate-900">{summary.total_companies.value}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full", summary.total_approved.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
              {summary.total_approved.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {summary.total_approved.trend}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Loans Approved</p>
          <p className="text-3xl font-bold text-slate-900">{summary.total_approved.value}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full", summary.total_rejected.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
              {summary.total_rejected.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {summary.total_rejected.trend}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Loans Rejected</p>
          <p className="text-3xl font-bold text-slate-900">{summary.total_rejected.value}</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <span className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full", summary.high_risk_companies.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
              {summary.high_risk_companies.trendUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {summary.high_risk_companies.trend}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 mb-1">High Risk Companies</p>
          <p className="text-3xl font-bold text-slate-900">{summary.high_risk_companies.value}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Distribution Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-slate-500" />
              Risk Distribution
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Risk Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-500" />
              Sector Risk Analysis (Avg Score)
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorRiskData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Loan Decision Analytics */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-slate-500" />
              Loan Decisions
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={loanDecisionsData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {loanDecisionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Trend Visualization */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-slate-500" />
              Average Risk Score Trend
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrendsData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* High Risk Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
              High Risk Alerts
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-80">
            {highRiskAlerts.map((company) => (
              <div key={company.id} className="p-4 rounded-lg border border-rose-100 bg-rose-50/50 flex items-start justify-between group hover:bg-rose-50 transition-colors">
                <div>
                  <h4 className="font-semibold text-slate-900">{company.name}</h4>
                  <p className="text-sm text-slate-600 mt-1">{company.reason}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-bold text-rose-600">{company.score}</span>
                  <span className="text-[10px] font-medium text-rose-500 uppercase tracking-wider">Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Exposure Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-500" />
              Portfolio Exposure by Sector (₹ Cr)
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portfolioExposureData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`₹${value} Cr`, 'Exposure']} />
                <Bar dataKey="exposure" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
          <p className="text-sm text-slate-500">Frequently used tools and workflows</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium transition-colors border border-blue-200">
            <PlayCircle className="w-5 h-5" />
            Run New Credit Evaluation
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-medium transition-colors border border-indigo-200">
            <FileSignature className="w-5 h-5" />
            View CAM Reports
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-medium transition-colors border border-emerald-200">
            <Download className="w-5 h-5" />
            Export Risk Analytics
          </button>
        </div>
      </div>

      {/* Company Risk Monitoring Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Company Risk Monitoring</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Credit Score</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Loan Decision</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentEvaluations.map((evalItem) => (
                <tr key={evalItem.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{evalItem.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{evalItem.sector}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{evalItem.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      evalItem.risk === 'Low Risk' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      evalItem.risk === 'Medium Risk' ? "bg-amber-50 text-amber-700 border-amber-200" :
                      "bg-rose-50 text-rose-700 border-rose-200"
                    )}>
                      {evalItem.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{evalItem.decision}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{evalItem.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
