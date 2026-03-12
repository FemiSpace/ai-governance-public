'use client';

import { dashboardStats, biasOverTime, complianceOverTime, auditEntries, models, governancePrinciples } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { riskColor, biasScoreColor, formatDate, principleStatusColor } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  BotMessageSquare, ShieldCheck, ScrollText, AlertTriangle,
  BarChart3, TrendingDown, Siren, MapPin, CheckCircle2,
} from 'lucide-react';

export default function Dashboard() {
  const flags = auditEntries.filter(e => e.riskFlag);
  const incidents = auditEntries.filter(e => e.incidentReport);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Governance Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">FemiSpace · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* HHS deadline banner */}
      <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center gap-3 text-sm text-orange-800">
        <AlertTriangle size={16} className="text-orange-500 flex-shrink-0" />
        <span><strong>HHS AI Strategy deadline: April 3, 2026</strong> — Bias mitigation, outcome monitoring, human oversight controls must be fully implemented. 22 days remaining.</span>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard title="Total AI Models" value={dashboardStats.totalModels} subtitle={`${dashboardStats.activeModels} active in production`} icon={BotMessageSquare} iconColor="text-indigo-600" />
        <StatCard title="Active Policies" value={dashboardStats.activePolicies} subtitle="2 in draft" icon={ScrollText} iconColor="text-purple-600" />
        <StatCard title="Open Risk Flags" value={dashboardStats.openAuditFlags} subtitle="Requires attention" icon={AlertTriangle} iconColor="text-orange-500" />
        <StatCard title="Compliance Rate" value={`${dashboardStats.complianceRate}%`} subtitle="12 frameworks tracked" icon={ShieldCheck} iconColor="text-green-600" />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="ISO 42001 Status" value={dashboardStats.iso42001Status === 'in-progress' ? 'In Progress' : dashboardStats.iso42001Status} subtitle="Target: Q4 2026" icon={ShieldCheck} iconColor="text-blue-500" />
        <StatCard title="FHIR Integrations Live" value={`${dashboardStats.fhirLive}/5`} subtitle="models on FHIR R4" icon={CheckCircle2} iconColor="text-teal-600" />
        <StatCard title="Open Incidents" value={dashboardStats.openIncidents} subtitle="72h reporting active" icon={Siren} iconColor="text-red-500" />
        <StatCard title="State Law Gaps" value={dashboardStats.stateComplianceGaps} subtitle="CO, CA, and 1 other" icon={MapPin} iconColor="text-yellow-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bias trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingDown size={16} className="text-green-600" />
              <CardTitle>Avg Bias Score Trend</CardTitle>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Lower is better · 6-month view</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={biasOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[10, 30]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-indigo-600" />
              <CardTitle>Compliance Score Trend</CardTitle>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Overall across all frameworks</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={complianceOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Open flags + incidents */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Siren size={16} className="text-red-500" />
              <CardTitle>Active Incidents & Flags</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {incidents.map(f => (
              <div key={f.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Siren size={11} className="text-red-600" />
                  <p className="text-xs font-semibold text-red-700">{f.modelName} · 72h Incident</p>
                </div>
                <p className="text-xs text-red-600">{f.action}</p>
                <p className="text-[10px] text-gray-400 mt-1">{formatDate(f.timestamp)}</p>
              </div>
            ))}
            {flags.filter(f => !f.incidentReport).map(f => (
              <div key={f.id} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-xs font-semibold text-orange-700">{f.modelName}</p>
                <p className="text-xs text-orange-600 mt-0.5">{f.action}</p>
                <p className="text-[10px] text-gray-400 mt-1">{formatDate(f.timestamp)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 7 Principles snapshot */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>7 Non-Negotiable Governance Principles</CardTitle>
          <p className="text-xs text-gray-400 mt-0.5">Implementation status across all principles</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {governancePrinciples.map(p => (
              <div key={p.id} className={`p-3 rounded-lg text-center border ${
                p.status === 'implemented' ? 'bg-green-50 border-green-200' :
                p.status === 'partial' ? 'bg-yellow-50 border-yellow-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <div className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center text-xs font-bold mx-auto mb-1.5">{p.number}</div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">{p.title}</p>
                <Badge className={`${principleStatusColor(p.status)} mt-1.5 text-[10px]`}>{p.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Models snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['Model', 'Version', 'Status', 'Risk', 'FDA Class', 'EU Tier', 'Bias', 'FHIR', 'Last Audit'].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {models.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900">{m.name}</td>
                  <td className="px-5 py-3 text-gray-500">{m.version}</td>
                  <td className="px-5 py-3 capitalize text-gray-600">{m.status}</td>
                  <td className="px-5 py-3"><Badge className={riskColor(m.riskLevel)}>{m.riskLevel}</Badge></td>
                  <td className="px-5 py-3 text-xs text-gray-600">{m.fdaClass}</td>
                  <td className="px-5 py-3 text-xs text-gray-600">{m.euRiskTier}</td>
                  <td className={`px-5 py-3 font-semibold ${biasScoreColor(m.biasScore)}`}>{m.biasScore}</td>
                  <td className="px-5 py-3 text-xs capitalize text-gray-600">{m.fhirStatus}</td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(m.lastAudit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
