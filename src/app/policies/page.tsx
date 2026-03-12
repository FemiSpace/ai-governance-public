'use client';

import { policies, models } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { policyStatusColor, formatDate } from '@/lib/utils';
import { ScrollText, User, Calendar, Tag } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Governance Policies</h1>
        <p className="text-sm text-gray-500 mt-1">Policies governing AI model development, deployment, and monitoring</p>
      </div>

      <div className="space-y-5">
        {policies.map(p => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                    <ScrollText size={18} />
                  </div>
                  <div>
                    <CardTitle>{p.title}</CardTitle>
                    <p className="text-xs text-gray-400 mt-0.5">{p.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <Badge className={policyStatusColor(p.status)}>{p.status}</Badge>
                  <span className="text-xs text-gray-400">v{p.version}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Tag size={11} />{p.category}</span>
                <span className="flex items-center gap-1"><User size={11} />{p.owner}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />Created {formatDate(p.createdAt)}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />Updated {formatDate(p.updatedAt)}</span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 font-medium">Applicable Models</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.applicableModels.map(mid => {
                    const m = models.find(x => x.id === mid);
                    return m ? (
                      <span key={mid} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs">{m.name}</span>
                    ) : null;
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
