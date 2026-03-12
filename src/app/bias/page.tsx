'use client';

import { biasMetrics, models } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { biasStatusColor, biasScoreColor } from '@/lib/utils';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { BarChart3, AlertTriangle } from 'lucide-react';

const radarData = models.map(m => ({
  model: m.name.split(' ').slice(0, 2).join(' '),
  Fairness: m.fairnessScore,
  Accuracy: m.accuracyScore,
  'Low Bias': 100 - m.biasScore,
}));

export default function BiasPage() {
  const failures = biasMetrics.filter(b => b.status === 'fail');
  const warnings = biasMetrics.filter(b => b.status === 'warn');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bias & Fairness</h1>
        <p className="text-sm text-gray-500 mt-1">Demographic disparity analysis across all production models</p>
      </div>

      {(failures.length > 0 || warnings.length > 0) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">{failures.length} fairness failure{failures.length !== 1 ? 's' : ''} detected · {warnings.length} warning{warnings.length !== 1 ? 's' : ''}</p>
            <p className="text-xs text-red-600 mt-0.5">Immediate review required for failing metrics. Models may not meet fairness policy thresholds.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-purple-600" />
              <CardTitle>Model Performance Radar</CardTitle>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Fairness, Accuracy, and Bias (inverted) per model</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="model" tick={{ fontSize: 10 }} />
                <Radar name="Fairness" dataKey="Fairness" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
                <Radar name="Accuracy" dataKey="Accuracy" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                <Radar name="Low Bias" dataKey="Low Bias" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Per-model bias scores */}
        <Card>
          <CardHeader>
            <CardTitle>Bias Score by Model</CardTitle>
            <p className="text-xs text-gray-400 mt-0.5">Score 0–100 · lower is better · threshold: 25</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {models.map(m => (
              <div key={m.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{m.name}</span>
                  <span className={`text-sm font-semibold ${biasScoreColor(m.biasScore)}`}>{m.biasScore}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.biasScore <= 15 ? 'bg-green-400' : m.biasScore <= 25 ? 'bg-yellow-400' : 'bg-red-400'}`}
                    style={{ width: `${m.biasScore}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed metrics table */}
      <Card>
        <CardHeader>
          <CardTitle>Demographic Fairness Metrics</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
              <tr>
                {['Model', 'Demographic', 'Metric', 'Value', 'Threshold', 'Status'].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {biasMetrics.map((b, i) => (
                <tr key={i} className={`${b.status === 'fail' ? 'bg-red-50' : b.status === 'warn' ? 'bg-yellow-50' : ''} hover:bg-gray-50 transition-colors`}>
                  <td className="px-5 py-3 font-medium text-gray-900">{b.modelName}</td>
                  <td className="px-5 py-3 text-gray-600">{b.demographic}</td>
                  <td className="px-5 py-3 text-gray-600">{b.metric}</td>
                  <td className="px-5 py-3 font-semibold text-gray-800">{b.value}</td>
                  <td className="px-5 py-3 text-gray-500">{b.threshold}</td>
                  <td className="px-5 py-3">
                    <Badge className={biasStatusColor(b.status)}>{b.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
