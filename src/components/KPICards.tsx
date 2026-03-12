import { Building, Activity, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

const kpis = [
  {
    title: 'Total Companies Analyzed',
    value: '1,248',
    icon: Building,
    trend: '+12%',
    trendUp: true,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Active Credit Evaluations',
    value: '42',
    icon: Activity,
    trend: '+5%',
    trendUp: true,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    title: 'High Risk Companies',
    value: '18',
    icon: AlertTriangle,
    trend: '-2%',
    trendUp: false,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    title: 'Loan Approvals Recommended',
    value: '312',
    icon: CheckCircle2,
    trend: '+8%',
    trendUp: true,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi) => (
        <div key={kpi.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.bg}`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${kpi.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {kpi.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {kpi.trend}
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{kpi.value}</h3>
            <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
