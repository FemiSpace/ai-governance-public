'use client';

import { complianceFrameworks, stateDisclosures } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { complianceColor, scoreColor, formatDate, disclosureColor } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldCheck, AlertTriangle, Globe, Building2, MapPin } from 'lucide-react';

const chartColors: Record<string, string> = {
  compliant: '#10b981', 'at-risk': '#f59e0b', 'non-compliant': '#ef4444', pending: '#6366f1', 'in-progress': '#8b5cf6',
};

const categoryIcons: Record<string, React.ReactNode> = {
  regulation: <Globe size={13} />,
  standard: <ShieldCheck size={13} />,
  'state-law': <MapPin size={13} />,
  interoperability: <Building2 size={13} />,
};

const categoryLabels: Record<string, string> = {
  regulation: 'Federal Regulation',
  standard: 'International Standard',
  'state-law': 'State Law',
  interoperability: 'Interoperability',
};

const groups = [
  { label: 'Federal Regulations', category: 'regulation' },
  { label: 'International Standards', category: 'standard' },
  { label: 'Interoperability', category: 'interoperability' },
  { label: 'State Laws', category: 'state-law' },
];

export default function CompliancePage() {
  const upcoming = complianceFrameworks.filter(f => f.deadline && new Date(f.deadline) < new Date('2026-07-01'));
  const chartData = complianceFrameworks.filter(f => f.score > 0).map(f => ({ name: f.shortName, score: f.score, status: f.status }));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
        <p className="text-sm text-gray-500 mt-1">{complianceFrameworks.length} frameworks · Federal regulations, international standards, and state laws</p>
      </div>

      {upcoming.length > 0 && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
          <AlertTriangle size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-800">Upcoming deadlines within 6 months</p>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {upcoming.map(f => (
                <span key={f.id} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  {f.shortName}: {f.deadline}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compliance Scores by Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={chartColors[entry.status] ?? '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center flex-wrap">
            {Object.entries(chartColors).map(([status, color]) => (
              <span key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
                {status}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grouped frameworks */}
      {groups.map(g => {
        const items = complianceFrameworks.filter(f => f.category === g.category);
        if (!items.length) return null;
        return (
          <div key={g.category} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gray-400">{categoryIcons[g.category]}</span>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{g.label}</h2>
            </div>
            <div className="space-y-3">
              {items.map(f => (
                <Card key={f.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {f.status !== 'compliant' && f.status !== 'pending' && <AlertTriangle size={13} className="text-yellow-500 flex-shrink-0" />}
                          <span className="font-semibold text-sm text-gray-900">{f.name}</span>
                          {f.mandatory && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Mandatory</span>}
                          {f.deadline && <span className="text-[10px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded">Deadline: {f.deadline}</span>}
                        </div>
                        {f.notes && <p className="text-xs text-gray-500">{f.notes}</p>}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-sm font-bold ${scoreColor(f.score)}`}>{f.score}%</span>
                        <Badge className={complianceColor(f.status)}>{f.status}</Badge>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                      <div className="h-full rounded-full transition-all" style={{ width: `${f.score}%`, backgroundColor: chartColors[f.status] ?? '#94a3b8' }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{f.passedControls}/{f.totalControls} controls passed · {f.openIssues} open issues</span>
                      <span>Next review {formatDate(f.nextReview)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}

      {/* State Disclosure Status */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <MapPin size={13} className="text-gray-400" />
          State AI Disclosure Status
        </h2>
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  {['State / Authority', 'Law', 'Requirement', 'Effective Date', 'Penalty', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stateDisclosures.map((s, i) => (
                  <tr key={i} className={`${s.status === 'gap' ? 'bg-red-50' : s.status === 'in-progress' ? 'bg-yellow-50' : ''} hover:bg-gray-50 transition-colors`}>
                    <td className="px-5 py-3 font-semibold text-gray-900">{s.state}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs">{s.law}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs max-w-xs">{s.requirement}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{s.effectiveDate}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{s.penalty ?? '—'}</td>
                    <td className="px-5 py-3"><Badge className={disclosureColor(s.status)}>{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
