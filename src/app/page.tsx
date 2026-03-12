'use client';

import { dashboardStats, biasOverTime, complianceOverTime, auditEntries, models } from '@/lib/mock-data';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { riskColor, biasScoreColor, formatDate } from '@/lib/utils';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  BotMessageSquare, ShieldCheck, ScrollText, AlertTriangle,
  BarChart3, TrendingDown,
} from 'lucide-react';

export default function Dashboard() {
  const flags = auditEntries.filter(e => e.riskFlag);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Governance Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">FemiSpace · {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total AI Models" value={dashboardStats.totalModels} subtitle={`${dashboardStats.activeModels} active`} icon={BotMessageSquare} iconColor="text-indigo-600" />
        <StatCard title="Active Policies" value={dashboardStats.activePolicies} icon={ScrollText} iconColor="text-purple-600" />
        <StatCard title="Open Audit Flags" value={dashboardStats.openAuditFlags} subtitle="Requires attention" icon={AlertTriangle} iconColor="text-red-500" />
        <StatCard title="Compliance Rate" value={`${dashboardStats.complianceRate}%`} subtitle="Across 4 frameworks" icon={ShieldCheck} iconColor="text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Bias trend */}
        <Card className="lg:col-span-1">
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
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-indigo-600" />
              <CardTitle>Compliance Score Trend</CardTitle>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Overall score across frameworks</p>
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

        {/* Open flags */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <CardTitle>Open Risk Flags</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {flags.map(f => (
              <div key={f.id} className="p-3 bg-red-50 rounded-lg border border-red-100">
                <p className="text-xs font-semibold text-red-700">{f.modelName}</p>
                <p className="text-xs text-red-600 mt-0.5">{f.action}</p>
                <p className="text-[10px] text-gray-400 mt-1">{formatDate(f.timestamp)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Models snapshot */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models Snapshot</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['Model', 'Version', 'Status', 'Risk', 'Bias Score', 'Accuracy', 'Last Audit'].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {models.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-900">{m.name}</td>
                  <td className="px-6 py-3 text-gray-500">{m.version}</td>
                  <td className="px-6 py-3 capitalize text-gray-600">{m.status}</td>
                  <td className="px-6 py-3">
                    <Badge className={riskColor(m.riskLevel)}>{m.riskLevel}</Badge>
                  </td>
                  <td className={`px-6 py-3 font-semibold ${biasScoreColor(m.biasScore)}`}>{m.biasScore}</td>
                  <td className="px-6 py-3 text-gray-700">{m.accuracyScore}%</td>
                  <td className="px-6 py-3 text-gray-500">{formatDate(m.lastAudit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
