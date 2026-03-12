import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, AlertCircle, Plus, Trash2, Save, ArrowRight, Bot } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const steps = [
  { id: 1, name: 'Company Profile', status: 'current' },
  { id: 2, name: 'Document Upload', status: 'upcoming' },
  { id: 3, name: 'AI Data Extraction', status: 'upcoming' },
  { id: 4, name: 'Risk Scoring', status: 'upcoming' },
  { id: 5, name: 'CAM Report', status: 'upcoming' },
];

const preChecks = [
  { name: 'GST Data Validation', status: 'pending' },
  { name: 'Bank Statement Consistency Check', status: 'pending' },
  { name: 'Legal Risk Screening', status: 'pending' },
  { name: 'Sector Risk Assessment', status: 'pending' },
];

export function CompanyAnalysis() {
  const navigate = useNavigate();
  const [promoters, setPromoters] = useState([{ name: '', role: '', ownership: '', experience: '' }]);
  const [formData, setFormData] = useState({
    company_name: '',
    cin: '',
    sector: '',
    year_established: '',
    headquarters: '',
    revenue: '',
    assets: '',
    liabilities: '',
    employees: '',
    loan_request_amount: '',
    loan_purpose: '',
    loan_tenure: '',
    credit_officer_notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePromoterChange = (index: number, field: string, value: string) => {
    const newPromoters = [...promoters];
    newPromoters[index] = { ...newPromoters[index], [field]: value };
    setPromoters(newPromoters);
  };

  const addPromoter = () => {
    setPromoters([...promoters, { name: '', role: '', ownership: '', experience: '' }]);
  };

  const removePromoter = (index: number) => {
    if (promoters.length > 1) {
      const newPromoters = promoters.filter((_, i) => i !== index);
      setPromoters(newPromoters);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.company_name) newErrors.company_name = 'Company Name is required';
    if (!formData.cin) newErrors.cin = 'CIN is required';
    if (!formData.sector) newErrors.sector = 'Sector is required';
    if (!formData.loan_request_amount) newErrors.loan_request_amount = 'Loan Amount is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (proceed: boolean) => {
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/create-company-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          promoters
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert(data.message);
        if (proceed) {
          navigate('/document-ai');
        }
      } else {
        alert(data.message || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving the profile.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Start New Credit Evaluation</h1>
        <p className="text-slate-500 mt-2 text-lg">Enter company details to begin AI-powered credit risk assessment.</p>
      </header>

      {/* Workflow Indicator */}
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={cn("h-0.5 w-full", stepIdx === 0 ? "bg-slate-200" : "bg-slate-200")} />
              </div>
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full",
                  step.status === 'current' ? "bg-blue-600 hover:bg-blue-900" : "bg-white border-2 border-slate-300"
                )}
              >
                {step.status === 'current' ? (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Company Profile Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Company Profile</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className={cn("w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", errors.company_name ? "border-red-500" : "border-slate-300")}
                />
                {errors.company_name && <p className="text-xs text-red-500">{errors.company_name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Company Registration Number (CIN) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="cin"
                  value={formData.cin}
                  onChange={handleInputChange}
                  className={cn("w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", errors.cin ? "border-red-500" : "border-slate-300")}
                />
                {errors.cin && <p className="text-xs text-red-500">{errors.cin}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Industry Sector <span className="text-red-500">*</span></label>
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className={cn("w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white", errors.sector ? "border-red-500" : "border-slate-300")}
                >
                  <option value="">Select Sector</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Financial Services">Financial Services</option>
                </select>
                {errors.sector && <p className="text-xs text-red-500">{errors.sector}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Year of Establishment</label>
                <input
                  type="number"
                  name="year_established"
                  value={formData.year_established}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Company Headquarters Location</label>
                <input
                  type="text"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Annual Revenue (USD)</label>
                <input
                  type="number"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Total Assets (USD)</label>
                <input
                  type="number"
                  name="assets"
                  value={formData.assets}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Total Liabilities (USD)</label>
                <input
                  type="number"
                  name="liabilities"
                  value={formData.liabilities}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Number of Employees</label>
                <input
                  type="number"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Promoter Details Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-900">Promoter Details</h3>
              <button
                onClick={addPromoter}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Add Additional Promoter
              </button>
            </div>
            <div className="p-6 space-y-6">
              {promoters.map((promoter, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 relative">
                  {promoters.length > 1 && (
                    <button
                      onClick={() => removePromoter(index)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <h4 className="text-sm font-medium text-slate-900 mb-4">Promoter {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-700">Promoter Name</label>
                      <input
                        type="text"
                        value={promoter.name}
                        onChange={(e) => handlePromoterChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-700">Promoter Role</label>
                      <input
                        type="text"
                        value={promoter.role}
                        onChange={(e) => handlePromoterChange(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-700">Ownership Percentage (%)</label>
                      <input
                        type="number"
                        value={promoter.ownership}
                        onChange={(e) => handlePromoterChange(index, 'ownership', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-700">Previous Business Experience</label>
                      <input
                        type="text"
                        value={promoter.experience}
                        onChange={(e) => handlePromoterChange(index, 'experience', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Request Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Loan Request Details</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Loan Amount Requested (USD) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="loan_request_amount"
                  value={formData.loan_request_amount}
                  onChange={handleInputChange}
                  className={cn("w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500", errors.loan_request_amount ? "border-red-500" : "border-slate-300")}
                />
                {errors.loan_request_amount && <p className="text-xs text-red-500">{errors.loan_request_amount}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Purpose of Loan</label>
                <select
                  name="loan_purpose"
                  value={formData.loan_purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select Purpose</option>
                  <option value="Working Capital">Working Capital</option>
                  <option value="Business Expansion">Business Expansion</option>
                  <option value="Infrastructure Development">Infrastructure Development</option>
                  <option value="Equipment Purchase">Equipment Purchase</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Loan Tenure (Months)</label>
                <input
                  type="number"
                  name="loan_tenure"
                  value={formData.loan_tenure}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Credit Officer Notes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-semibold text-slate-900">Credit Officer Notes</h3>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Initial Due Diligence Notes</label>
                <textarea
                  name="credit_officer_notes"
                  value={formData.credit_officer_notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Factory operating capacity appears moderate. Management claims strong upcoming contracts."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <p className="text-xs text-slate-500">These notes will later be used by the AI risk scoring engine.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          {/* AI Pre-Check Indicators */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" />
                AI Pre-Check Indicators
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4">
                Automatic checks that will run after submission.
              </p>
              <ul className="space-y-4">
                {preChecks.map((check, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{check.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{check.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <button
                onClick={() => handleSave(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Company Profile
              </button>
              <button
                onClick={() => handleSave(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
              >
                Proceed to Document Upload
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
