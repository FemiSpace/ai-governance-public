'use client';

import { useState } from 'react';
import { auditEntries } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate, categoryIcon } from '@/lib/utils';
import { ClipboardList, AlertTriangle, CheckCircle, Siren } from 'lucide-react';

const categories = ['all', 'bias', 'compliance', 'hitl', 'performance', 'policy', 'security', 'incident'];

export default function AuditPage() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? auditEntries : auditEntries.filter(e => e.category === filter);
  const incidents = auditEntries.filter(e => e.incidentReport);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-sm text-gray-500 mt-1">Full history of AI model actions, policy events, risk flags, and 72-hour incident reports</p>
      </div>

      {incidents.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <Siren size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-800">{incidents.length} open incident report{incidents.length !== 1 ? 's' : ''} — 72-hour reporting clock active</p>
            {incidents.map(i => (
              <p key={i.id} className="text-xs text-red-600 mt-1">{i.modelName}: {i.action}</p>
            ))}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filter === c ? 'bg-fuchsia-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c === 'all' ? `All (${auditEntries.length})` : `${categoryIcon(c)} ${c} (${auditEntries.filter(e => e.category === c).length})`}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-gray-500" />
            <CardTitle>Events ({filtered.length})</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {filtered.map(entry => (
              <div key={entry.id} className={`px-6 py-4 ${entry.incidentReport ? 'bg-red-50' : entry.riskFlag ? 'bg-orange-50' : 'hover:bg-gray-50'} transition-colors`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-0.5 flex-shrink-0 ${entry.incidentReport ? 'text-red-600' : entry.riskFlag ? 'text-orange-500' : 'text-green-500'}`}>
                      {entry.incidentReport ? <Siren size={16} /> : entry.riskFlag ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">{entry.modelName}</span>
                        <span className="text-xs text-gray-400">{categoryIcon(entry.category)} {entry.category}</span>
                        {entry.incidentReport && <Badge className="bg-red-100 text-red-700">72h Incident Report</Badge>}
                        {entry.riskFlag && !entry.incidentReport && <Badge className="bg-orange-100 text-orange-700">Risk Flag</Badge>}
                      </div>
                      <p className="text-sm text-gray-700">{entry.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{entry.details}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>Actor: {entry.actor}</span>
                        <span>·</span>
                        <span>{formatDate(entry.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right text-xs font-medium max-w-[160px]">
                    <span className={entry.riskFlag ? 'text-red-600' : 'text-green-600'}>{entry.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
