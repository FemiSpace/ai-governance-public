'use client';

import { policies, models } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { policyStatusColor, formatDate } from '@/lib/utils';
import { ScrollText, User, Calendar, Tag, BookOpen } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'Risk Management': 'bg-orange-50 text-orange-700',
  'Fairness': 'bg-purple-50 text-purple-700',
  'Privacy': 'bg-blue-50 text-blue-700',
  'Human Oversight': 'bg-teal-50 text-teal-700',
  'Monitoring': 'bg-indigo-50 text-indigo-700',
  'Transparency': 'bg-pink-50 text-pink-700',
  'Regulatory': 'bg-red-50 text-red-700',
  'Incident Response': 'bg-red-50 text-red-700',
  'Vendor Risk': 'bg-yellow-50 text-yellow-700',
  'Cybersecurity': 'bg-gray-100 text-gray-700',
};

export default function PoliciesPage() {
  const active = policies.filter(p => p.status === 'active');
  const draft = policies.filter(p => p.status === 'draft');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Governance Policies</h1>
        <p className="text-sm text-gray-500 mt-1">{active.length} active · {draft.length} in draft · Aligned with NIST AI RMF, ISO 42001, EU AI Act, and US state laws</p>
      </div>

      {draft.length > 0 && (
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
          <strong>{draft.length} draft {draft.length === 1 ? 'policy' : 'policies'}</strong> pending review: {draft.map(p => p.title).join(', ')}
        </div>
      )}

      <div className="space-y-4">
        {policies.map(p => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600 flex-shrink-0">
                    <ScrollText size={18} />
                  </div>
                  <div>
                    <CardTitle>{p.title}</CardTitle>
                    <p className="text-xs text-gray-500 mt-0.5">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={policyStatusColor(p.status)}>{p.status}</Badge>
                  <span className="text-xs text-gray-400">v{p.version}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[p.category] ?? 'bg-gray-100 text-gray-700'}`}>
                  <Tag size={10} />{p.category}
                </span>
                <span className="flex items-center gap-1"><User size={11} />{p.owner}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />Updated {formatDate(p.updatedAt)}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Applicable Models</p>
                  <div className="flex flex-wrap gap-1">
                    {p.applicableModels.map(mid => {
                      const m = models.find(x => x.id === mid);
                      return m ? <span key={mid} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs">{m.name}</span> : null;
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium flex items-center gap-1"><BookOpen size={10} />Frameworks</p>
                  <div className="flex flex-wrap gap-1">
                    {p.frameworks.map(f => <span key={f} className="px-2 py-0.5 bg-fuchsia-50 text-fuchsia-700 rounded text-xs">{f}</span>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
