'use client';

import { complianceFrameworks } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { complianceColor, scoreColor, formatDate } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

const chartColors: Record<string, string> = {
  compliant: '#10b981',
  'at-risk': '#f59e0b',
  'non-compliant': '#ef4444',
};

export default function CompliancePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
        <p className="text-sm text-gray-500 mt-1">Regulatory and framework compliance status for AI systems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-green-600" />
              <CardTitle>Framework Scores</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={complianceFrameworks} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={130} />
                <Tooltip formatter={(v) => [`${v}%`, 'Score']} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {complianceFrameworks.map(f => (
                    <Cell key={f.id} fill={chartColors[f.status]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {complianceFrameworks.map(f => (
            <Card key={f.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {f.status !== 'compliant' && <AlertTriangle size={14} className="text-yellow-500" />}
                    <span className="font-semibold text-sm text-gray-900">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${scoreColor(f.score)}`}>{f.score}%</span>
                    <Badge className={complianceColor(f.status)}>{f.status}</Badge>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${f.score}%`, backgroundColor: chartColors[f.status] }}
                  />
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

      {/* Detailed table */}
      <Card>
        <CardHeader><CardTitle>Compliance Details</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['Framework', 'Score', 'Status', 'Controls Passed', 'Open Issues', 'Last Review', 'Next Review'].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complianceFrameworks.map(f => (
                <tr key={f.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-gray-900">{f.name}</td>
                  <td className={`px-5 py-3 font-bold ${scoreColor(f.score)}`}>{f.score}%</td>
                  <td className="px-5 py-3"><Badge className={complianceColor(f.status)}>{f.status}</Badge></td>
                  <td className="px-5 py-3 text-gray-600">{f.passedControls}/{f.totalControls}</td>
                  <td className={`px-5 py-3 font-medium ${f.openIssues > 3 ? 'text-red-600' : 'text-yellow-600'}`}>{f.openIssues}</td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(f.lastReview)}</td>
                  <td className="px-5 py-3 text-gray-500">{formatDate(f.nextReview)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
