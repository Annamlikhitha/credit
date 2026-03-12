import { KPICards } from '../components/KPICards';
import { Charts } from '../components/Charts';
import { CompanyTable } from '../components/CompanyTable';
import { QuickActions } from '../components/QuickActions';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Credit Intelligence Dashboard</h1>
        <p className="text-slate-500 mt-2 text-lg">AI-powered corporate credit evaluation and risk monitoring.</p>
      </header>
      
      <KPICards />
      <Charts />
      <CompanyTable />
      <QuickActions />
    </div>
  );
}
