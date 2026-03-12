import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize SQLite Database
const db = new Database(':memory:'); // Using in-memory for prototype

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    cin TEXT NOT NULL,
    sector TEXT,
    year_established INTEGER,
    headquarters TEXT,
    revenue REAL,
    assets REAL,
    liabilities REAL,
    employees INTEGER,
    promoters TEXT,
    loan_request_amount REAL,
    loan_purpose TEXT,
    loan_tenure INTEGER,
    credit_officer_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS documents (
    document_id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    file_path TEXT,
    document_type TEXT,
    processing_status TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS financial_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    revenue REAL,
    profit REAL,
    debt REAL,
    debt_equity_ratio REAL,
    operating_margin REAL,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS news_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    title TEXT,
    source TEXT,
    publication_date TEXT,
    sentiment TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS legal_cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    case_title TEXT,
    court TEXT,
    status TEXT,
    risk_impact TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS sector_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    sector_name TEXT,
    industry_growth TEXT,
    regulatory_risk TEXT,
    market_volatility TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS promoter_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    promoter_name TEXT,
    past_companies TEXT,
    track_record TEXT,
    litigation_history TEXT,
    risk_score INTEGER,
    risk_explanation TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  DROP TABLE IF EXISTS risk_scores;
  CREATE TABLE risk_scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    credit_score INTEGER,
    financial_strength_score INTEGER,
    debt_ratio_score INTEGER,
    revenue_stability_score INTEGER,
    promoter_risk_score INTEGER,
    legal_risk_score INTEGER,
    sector_risk_score INTEGER,
    recommendation TEXT,
    recommended_loan_amount TEXT,
    interest_rate TEXT,
    confidence_level INTEGER,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  DROP TABLE IF EXISTS cam_reports;
  CREATE TABLE cam_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER,
    credit_score INTEGER,
    loan_decision TEXT,
    recommended_amount TEXT,
    interest_rate TEXT,
    risk_summary TEXT,
    cam_document_path TEXT,
    FOREIGN KEY(company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT,
    department TEXT,
    last_login DATETIME,
    status TEXT DEFAULT 'Active'
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    user TEXT,
    activity TEXT
  );

  -- Insert dummy users if empty
  INSERT INTO users (name, role, department, last_login, status)
  SELECT 'Rajesh Kumar', 'Admin', 'IT & Security', datetime('now', '-1 hours'), 'Active'
  WHERE NOT EXISTS (SELECT 1 FROM users);

  INSERT INTO users (name, role, department, last_login, status)
  SELECT 'Anita Desai', 'Credit Officer', 'Corporate Lending', datetime('now', '-2 days'), 'Active'
  WHERE NOT EXISTS (SELECT 1 FROM users WHERE name = 'Anita Desai');

  INSERT INTO audit_logs (user, activity)
  SELECT 'Rajesh Kumar', 'Initiated credit evaluation for ABC Manufacturing'
  WHERE NOT EXISTS (SELECT 1 FROM audit_logs);

  INSERT INTO audit_logs (user, activity)
  SELECT 'Anita Desai', 'Exported CAM report for TechNova Solutions'
  WHERE NOT EXISTS (SELECT 1 FROM audit_logs WHERE user = 'Anita Desai');
  
  INSERT INTO audit_logs (user, activity)
  SELECT 'Rajesh Kumar', 'Updated system permissions'
  WHERE NOT EXISTS (SELECT 1 FROM audit_logs WHERE activity = 'Updated system permissions');
`);

// API Placeholders
app.post('/api/create-company-profile', (req, res) => {
  const {
    company_name, cin, sector, year_established, headquarters,
    revenue, assets, liabilities, employees,
    promoters, loan_request_amount, loan_purpose, loan_tenure, credit_officer_notes
  } = req.body;

  if (!company_name || !cin || !sector || !loan_request_amount) {
    return res.status(400).json({ status: 'error', message: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO companies (
        company_name, cin, sector, year_established, headquarters,
        revenue, assets, liabilities, employees,
        promoters, loan_request_amount, loan_purpose, loan_tenure, credit_officer_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      company_name, cin, sector, year_established, headquarters,
      revenue, assets, liabilities, employees,
      JSON.stringify(promoters), loan_request_amount, loan_purpose, loan_tenure, credit_officer_notes
    );

    res.json({ status: 'success', company_id: info.lastInsertRowid, message: 'Company profile created successfully.' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to create company profile.' });
  }
});

app.post('/api/upload-documents', (req, res) => {
  // In a real app, this would handle file uploads (e.g., using multer)
  // For this prototype, we'll just return a success response
  res.json({ status: 'success', message: 'Documents uploaded successfully.' });
});

app.post('/api/extract-financial-data', (req, res) => {
  // Simulate AI extraction process
  res.json({ status: 'success', message: 'Financial data extraction started.' });
});

app.get('/api/document-insights', (req, res) => {
  // Return mock insights for the prototype
  res.json({
    status: 'success',
    data: {
      metrics: {
        revenue: '$45.2M',
        profit: '$8.4M',
        debt: '$12.1M',
        debt_equity_ratio: '1.2',
        operating_margin: '18.5%'
      },
      commitments: [
        { type: 'Outstanding Bank Loans', value: '$5.2M with HDFC Bank' },
        { type: 'Collateral Information', value: 'Factory premises in Pune' },
        { type: 'Debt Obligations', value: '$2.1M due in 2026' },
        { type: 'Credit Facilities', value: '$10M revolving credit line' }
      ],
      risks: [
        { flag: 'High Debt to Equity Ratio', level: 'Yellow', message: 'Ratio is 1.2, slightly above industry average.' },
        { flag: 'Revenue Decline in Last Two Years', level: 'Green', message: 'Revenue has been growing steadily.' },
        { flag: 'Large Outstanding Loan Obligations', level: 'Yellow', message: 'Significant obligations due in 2026.' }
      ]
    }
  });
});

app.post('/api/run-research-agent', (req, res) => {
  res.json({ status: 'success', message: 'Research agent analysis completed.' });
});

app.get('/api/company-news', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, title: 'Steel Industry Faces Demand Slowdown', source: 'Economic Times', publication_date: '2025-10-12', sentiment: 'Negative' },
      { id: 2, title: 'ABC Manufacturing Secures New Government Contract', source: 'Business Standard', publication_date: '2025-09-05', sentiment: 'Positive' },
      { id: 3, title: 'Q3 Earnings Report Shows Stable Growth', source: 'Financial Express', publication_date: '2025-08-20', sentiment: 'Neutral' }
    ]
  });
});

app.get('/api/legal-records', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, case_title: 'ABC Manufacturing vs State Tax Department', court: 'High Court', status: 'Pending', risk_impact: 'Moderate Risk' },
      { id: 2, case_title: 'Supplier Dispute: XYZ Logistics', court: 'District Court', status: 'Resolved', risk_impact: 'Low Risk' }
    ]
  });
});

app.get('/api/sector-risk-analysis', (req, res) => {
  res.json({
    status: 'success',
    data: {
      sector: 'Steel Manufacturing',
      industry_growth: 'Moderate',
      regulatory_risk: 'Medium',
      market_volatility: 'High'
    }
  });
});

app.post('/api/calculate-credit-score', (req, res) => {
  res.json({
    status: 'success',
    data: {
      credit_score: 72,
      risk_level: 'Medium Risk',
      confidence_level: 87,
      explanation: [
        'The company shows stable revenue growth and strong promoter credibility.',
        'However, moderate legal risk and high sector volatility reduce the overall credit score.',
        'Debt ratio is slightly high but manageable within current cash flow projections.'
      ]
    }
  });
});

app.get('/api/financial-ratios', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { metric: 'Debt to Equity Ratio', value: '1.8', interpretation: 'Slightly high but manageable.' },
      { metric: 'Current Ratio', value: '1.3', interpretation: 'Adequate short-term liquidity.' },
      { metric: 'Operating Margin', value: '18%', interpretation: 'Healthy operational efficiency.' },
      { metric: 'Revenue Growth', value: '12%', interpretation: 'Consistent year-over-year growth.' }
    ]
  });
});

app.get('/api/risk-breakdown', (req, res) => {
  res.json({
    status: 'success',
    data: {
      factors: [
        { name: 'Financial Strength', score: 80 },
        { name: 'Debt Ratio', score: 60 },
        { name: 'Revenue Stability', score: 75 },
        { name: 'Promoter Risk', score: 85 },
        { name: 'Legal Risk', score: 55 },
        { name: 'Sector Risk', score: 65 }
      ],
      radar: [
        { subject: 'Financial Risk', A: 80, fullMark: 100 },
        { subject: 'Legal Risk', A: 55, fullMark: 100 },
        { subject: 'Operational Risk', A: 75, fullMark: 100 },
        { subject: 'Market Risk', A: 65, fullMark: 100 },
        { subject: 'Promoter Risk', A: 85, fullMark: 100 }
      ]
    }
  });
});

app.post('/api/generate-loan-recommendation', (req, res) => {
  res.json({
    status: 'success',
    data: {
      decision: 'Approved with Conditions',
      amount: '₹5 Crore',
      interest_rate: '11.2%',
      conditions: [
        'Monitor sector volatility',
        'Review legal case resolution before full disbursement',
        'Quarterly submission of financial statements'
      ]
    }
  });
});

app.post('/api/generate-cam-report', (req, res) => {
  res.json({ status: 'success', message: 'CAM report generated successfully.' });
});

app.get('/api/cam-report', (req, res) => {
  res.json({
    status: 'success',
    data: {
      header: {
        company_name: 'ABC Manufacturing Ltd',
        sector: 'Steel Manufacturing',
        loan_requested: '₹7 Crore',
        credit_score: 72,
        risk_level: 'Medium Risk',
        date: new Date().toISOString().split('T')[0]
      },
      five_cs: {
        character: 'Promoter has strong industry experience with no major legal disputes.',
        capacity: 'Stable revenue growth and consistent operating margins indicate moderate repayment capacity.',
        capital: 'Debt-to-equity ratio slightly above industry average but still within acceptable range.',
        collateral: 'Manufacturing plant and machinery offered as collateral.',
        conditions: 'Steel sector facing moderate volatility due to global demand fluctuations.'
      },
      risk_summary: [
        'Moderate legal risk due to one pending litigation case.',
        'High sector volatility.',
        'Debt ratio slightly above ideal range.'
      ],
      recommendation: {
        decision: 'Approved with Conditions',
        amount: '₹5 Crore',
        interest_rate: '11.2%',
        conditions: [
          'Periodic financial monitoring required.',
          'Legal case resolution to be reviewed within 12 months.'
        ],
        explanation: 'The company demonstrates stable revenue growth and strong operational capacity. However, moderate legal risks and sector volatility require additional monitoring conditions before full loan approval.'
      }
    }
  });
});

app.post('/api/export-cam-pdf', (req, res) => {
  res.json({ status: 'success', message: 'PDF exported successfully.', url: '/downloads/cam-report.pdf' });
});

app.post('/api/export-cam-doc', (req, res) => {
  res.json({ status: 'success', message: 'Word document exported successfully.', url: '/downloads/cam-report.docx' });
});

// Analytics Endpoints
app.get('/api/portfolio-summary', (req, res) => {
  res.json({
    status: 'success',
    data: {
      total_evaluated: { value: 146, trend: '+12%', isPositive: true },
      loans_approved: { value: 92, trend: '+8%', isPositive: true },
      loans_rejected: { value: 28, trend: '-2%', isPositive: true },
      high_risk_companies: { value: 26, trend: '+5%', isPositive: false }
    }
  });
});

app.get('/api/sector-risk-data', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { sector: 'Manufacturing', avg_score: 68 },
      { sector: 'Retail', avg_score: 75 },
      { sector: 'Technology', avg_score: 82 },
      { sector: 'Infrastructure', avg_score: 55 },
      { sector: 'Healthcare', avg_score: 78 }
    ]
  });
});

app.get('/api/loan-decisions', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { name: 'Approved', value: 45, color: '#10b981' },
      { name: 'Conditional', value: 35, color: '#f59e0b' },
      { name: 'Rejected', value: 20, color: '#f43f5e' }
    ]
  });
});

app.get('/api/high-risk-companies', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, name: 'XYZ Infrastructure', score: 42, reason: 'High Debt Ratio' },
      { id: 2, name: 'Omega Textiles', score: 38, reason: 'Legal Dispute Risk' },
      { id: 3, name: 'Global Logistics', score: 45, reason: 'Declining Revenue' }
    ]
  });
});

app.get('/api/risk-trends', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { month: 'Jan', avg_score: 72 },
      { month: 'Feb', avg_score: 74 },
      { month: 'Mar', avg_score: 71 },
      { month: 'Apr', avg_score: 68 },
      { month: 'May', avg_score: 69 },
      { month: 'Jun', avg_score: 73 }
    ]
  });
});

app.get('/api/portfolio-exposure', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { sector: 'Manufacturing', exposure: 120 },
      { sector: 'Infrastructure', exposure: 90 },
      { sector: 'Retail', exposure: 45 },
      { sector: 'Technology', exposure: 60 },
      { sector: 'Healthcare', exposure: 30 }
    ]
  });
});

app.get('/api/risk-distribution', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { level: 'Low Risk', count: 45, fill: '#10b981' },
      { level: 'Medium Risk', count: 68, fill: '#f59e0b' },
      { level: 'High Risk', count: 33, fill: '#f43f5e' }
    ]
  });
});

app.get('/api/recent-evaluations', (req, res) => {
  res.json({
    status: 'success',
    data: [
      { id: 1, name: 'ABC Manufacturing Ltd', sector: 'Steel', score: 72, risk: 'Medium Risk', decision: 'Approved with Conditions', date: 'Today' },
      { id: 2, name: 'TechNova Solutions', sector: 'Technology', score: 85, risk: 'Low Risk', decision: 'Approved', date: 'Yesterday' },
      { id: 3, name: 'XYZ Infrastructure', sector: 'Infrastructure', score: 42, risk: 'High Risk', decision: 'Rejected', date: '2 days ago' },
      { id: 4, name: 'MediCare Plus', sector: 'Healthcare', score: 78, risk: 'Low Risk', decision: 'Approved', date: '3 days ago' },
      { id: 5, name: 'Omega Textiles', sector: 'Retail', score: 38, risk: 'High Risk', decision: 'Rejected', date: '1 week ago' }
    ]
  });
});

// Admin Endpoints
app.get('/api/system-metrics', (req, res) => {
  res.json({
    status: 'success',
    data: {
      total_users: 28,
      active_evaluations: 14,
      companies_stored: 312,
      system_uptime: '99.8%'
    }
  });
});

app.get('/api/users', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users ORDER BY id DESC').all();
    res.json({ status: 'success', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch users' });
  }
});

app.post('/api/create-user', (req, res) => {
  res.json({ status: 'success', message: 'User created successfully' });
});

app.put('/api/update-user', (req, res) => {
  res.json({ status: 'success', message: 'User updated successfully' });
});

app.delete('/api/delete-user', (req, res) => {
  res.json({ status: 'success', message: 'User deleted successfully' });
});

app.get('/api/audit-logs', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM audit_logs ORDER BY id DESC LIMIT 10').all();
    res.json({ status: 'success', data: logs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch audit logs' });
  }
});

app.get('/api/ai-metrics', (req, res) => {
  res.json({
    status: 'success',
    data: {
      accuracy: '91%',
      avg_confidence: '88%',
      docs_processed: 12450,
      queries_completed: 8340
    }
  });
});

app.get('/api/security-status', (req, res) => {
  res.json({
    status: 'success',
    data: {
      unauthorized_attempts: 2,
      api_volume: '45.2k / day',
      health_status: 'Optimal'
    }
  });
});

app.post('/api/upload-company-data', (req, res) => {
  res.json({ status: 'success', message: 'Company data uploaded successfully.' });
});

app.post('/api/analyze-documents', (req, res) => {
  res.json({ status: 'success', message: 'Document analysis started.' });
});

app.get('/api/risk-score', (req, res) => {
  res.json({ status: 'success', data: { score: 72, risk_level: 'Medium Risk' } });
});

app.post('/api/generate-cam', (req, res) => {
  res.json({ status: 'success', message: 'CAM report generation initiated.' });
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
