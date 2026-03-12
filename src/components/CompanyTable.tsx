import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const companies = [
  {
    id: 1,
    name: 'ABC Manufacturing',
    sector: 'Steel',
    score: 72,
    riskLevel: 'Medium Risk',
    recommendation: 'Approved with conditions',
  },
  {
    id: 2,
    name: 'Global Tech Solutions',
    sector: 'Software',
    score: 91,
    riskLevel: 'Low Risk',
    recommendation: 'Approved',
  },
  {
    id: 3,
    name: 'Sunrise Logistics',
    sector: 'Transportation',
    score: 45,
    riskLevel: 'High Risk',
    recommendation: 'Rejected',
  },
  {
    id: 4,
    name: 'Green Energy Corp',
    sector: 'Renewables',
    score: 85,
    riskLevel: 'Low Risk',
    recommendation: 'Approved',
  },
  {
    id: 5,
    name: 'Urban Retail Group',
    sector: 'Retail',
    score: 68,
    riskLevel: 'Medium Risk',
    recommendation: 'Under Review',
  },
];

export function CompanyTable() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Company Evaluations</h3>
          <p className="text-sm text-slate-500">Latest credit risk analysis results</p>
        </div>
        <button onClick={() => navigate('/company-analysis')} className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Company Name</th>
              <th className="px-6 py-4 font-medium">Sector</th>
              <th className="px-6 py-4 font-medium">Credit Score</th>
              <th className="px-6 py-4 font-medium">Risk Level</th>
              <th className="px-6 py-4 font-medium">Recommendation</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{company.name}</td>
                <td className="px-6 py-4 text-slate-600">{company.sector}</td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-slate-900">{company.score}</span>
                  <span className="text-slate-400 text-xs ml-1">/ 100</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      company.riskLevel === 'Low Risk' && "bg-emerald-100 text-emerald-800",
                      company.riskLevel === 'Medium Risk' && "bg-amber-100 text-amber-800",
                      company.riskLevel === 'High Risk' && "bg-rose-100 text-rose-800"
                    )}
                  >
                    {company.riskLevel}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{company.recommendation}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
