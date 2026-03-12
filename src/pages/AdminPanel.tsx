import React, { useState, useEffect } from 'react';
import { 
  Users, Activity, Database, Server, Shield, 
  Settings, Download, Upload, Trash2, Edit,
  RefreshCw, Lock, FileText, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [aiMetrics, setAiMetrics] = useState<any>(null);
  const [securityStatus, setSecurityStatus] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [
          metricsRes, usersRes, logsRes, aiRes, securityRes, companiesRes
        ] = await Promise.all([
          fetch('/api/system-metrics').then(r => r.json()),
          fetch('/api/users').then(r => r.json()),
          fetch('/api/audit-logs').then(r => r.json()),
          fetch('/api/ai-metrics').then(r => r.json()),
          fetch('/api/security-status').then(r => r.json()),
          fetch('/api/recent-evaluations').then(r => r.json()) // Reusing recent evaluations for company data
        ]);

        if (metricsRes.status === 'success') setMetrics(metricsRes.data);
        if (usersRes.status === 'success') setUsers(usersRes.data);
        if (logsRes.status === 'success') setAuditLogs(logsRes.data);
        if (aiRes.status === 'success') setAiMetrics(aiRes.data);
        if (securityRes.status === 'success') setSecurityStatus(securityRes.data);
        if (companiesRes.status === 'success') setCompanies(companiesRes.data);

      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleBackup = () => {
    alert('Database backup initiated.');
  };

  const handleExport = (type: string) => {
    alert(`Exporting ${type} data...`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Control Panel</h1>
        <p className="text-slate-500 mt-2 text-lg">Platform management and system monitoring for Intelli-Credit.</p>
      </header>

      {/* System Overview Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Registered Users</p>
            <p className="text-3xl font-bold text-slate-900">{metrics.total_users}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Active Credit Evaluations</p>
            <p className="text-3xl font-bold text-slate-900">{metrics.active_evaluations}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Companies in Database</p>
            <p className="text-3xl font-bold text-slate-900">{metrics.companies_stored}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Server className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">System Uptime</p>
            <p className="text-3xl font-bold text-slate-900">{metrics.system_uptime}</p>
          </div>
        </div>
      )}

      {/* User Management Panel */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Add New User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Account Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(user.last_login).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      user.status === 'Active' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-700 border-slate-200"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-blue-600 hover:text-blue-900" title="Edit User"><Edit className="w-4 h-4" /></button>
                      <button className="text-amber-600 hover:text-amber-900" title="Reset Password"><Lock className="w-4 h-4" /></button>
                      <button className="text-rose-600 hover:text-rose-900" title="Deactivate User"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Based Access Control */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-500" />
          Access Permissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              Admin
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Modify</button>
            </h4>
            <p className="text-sm text-slate-600">Full system control, user management, and configuration.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              Credit Officer
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Modify</button>
            </h4>
            <p className="text-sm text-slate-600">Access company evaluations, document uploads, and CAM reports.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              Risk Analyst
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Modify</button>
            </h4>
            <p className="text-sm text-slate-600">View analytics, risk scoring, and portfolio monitoring.</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              Data Analyst
              <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">Modify</button>
            </h4>
            <p className="text-sm text-slate-600">Access financial datasets, export reports, and view metrics.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Model Monitoring */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-semibold text-slate-900">AI Model Performance</h3>
          </div>
          {aiMetrics && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Model Accuracy</p>
                <p className="text-2xl font-bold text-emerald-600">{aiMetrics.accuracy}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg. Confidence</p>
                <p className="text-2xl font-bold text-blue-600">{aiMetrics.avg_confidence}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Docs Processed</p>
                <p className="text-2xl font-bold text-slate-900">{aiMetrics.docs_processed.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Queries Completed</p>
                <p className="text-2xl font-bold text-slate-900">{aiMetrics.queries_completed.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Security Monitoring */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-semibold text-slate-900">Security Monitoring</h3>
          </div>
          {securityStatus && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Unauthorized Access Attempts</p>
                    <p className="text-xs text-slate-500">Last 24 hours</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-rose-600">{securityStatus.unauthorized_attempts}</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">API Request Volume</p>
                    <p className="text-xs text-slate-500">Average daily requests</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-slate-900">{securityStatus.api_volume}</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">System Health Status</p>
                    <p className="text-xs text-slate-500">Current operational state</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-600 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                  {securityStatus.health_status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Data Management */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-900">Company Data Management</h3>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors shadow-sm">
              <Upload className="w-3.5 h-3.5" />
              Import CSV
            </button>
          </div>
          <div className="flex-1 overflow-y-auto max-h-80">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 sticky top-0">
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company Name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sector</th>
                  <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {companies.map((company) => (
                  <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">{company.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{company.sector}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900" title="View"><FileText className="w-4 h-4" /></button>
                        <button className="text-rose-600 hover:text-rose-900" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Logs */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-500" />
            <h3 className="text-lg font-semibold text-slate-900">Audit Logs</h3>
          </div>
          <div className="flex-1 overflow-y-auto max-h-80 p-6 space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                <div>
                  <p className="text-sm text-slate-900">
                    <span className="font-semibold">{log.user}</span> {log.activity}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Backup & Export */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-sm p-6 text-white">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-semibold">Data Backup & Export</h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleBackup}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Database className="w-4 h-4" />
            Backup Database
          </button>
          <button 
            onClick={() => handleExport('Company')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Company Data
          </button>
          <button 
            onClick={() => handleExport('Analytics')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Risk Analytics
          </button>
        </div>
      </div>

    </div>
  );
}
