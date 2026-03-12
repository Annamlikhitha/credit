/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CompanyAnalysis } from './pages/CompanyAnalysis';
import { DocumentUpload } from './pages/DocumentUpload';
import { ResearchAgent } from './pages/ResearchAgent';
import { RiskScoring } from './pages/RiskScoring';
import { CamReport } from './pages/CamReport';
import { Analytics } from './pages/Analytics';
import { AdminPanel } from './pages/AdminPanel';
import { Architecture } from './pages/Architecture';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="company-analysis" element={<CompanyAnalysis />} />
          <Route path="document-ai" element={<DocumentUpload />} />
          <Route path="research-agent" element={<ResearchAgent />} />
          <Route path="risk-scoring" element={<RiskScoring />} />
          <Route path="cam-generator" element={<CamReport />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="settings" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
