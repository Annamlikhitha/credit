import { 
  LayoutDashboard, 
  Building2, 
  FileText, 
  Bot, 
  ShieldAlert, 
  FileSignature, 
  BarChart3, 
  Settings,
  Network
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Company Analysis', icon: Building2, path: '/company-analysis' },
  { name: 'Document AI Extraction', icon: FileText, path: '/document-ai' },
  { name: 'AI Research Agent', icon: Bot, path: '/research-agent' },
  { name: 'Credit Risk Scoring', icon: ShieldAlert, path: '/risk-scoring' },
  { name: 'CAM Report Generator', icon: FileSignature, path: '/cam-generator' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Architecture', icon: Network, path: '/architecture' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-blue-500" />
          Intelli-Credit
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-blue-600/10 text-blue-500" 
                : "hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-500 text-center">
          &copy; 2026 Intelli-Credit Systems
        </div>
      </div>
    </div>
  );
}
