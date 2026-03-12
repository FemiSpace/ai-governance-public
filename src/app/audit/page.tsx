'use client';

import { auditEntries } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { ClipboardList, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AuditPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-sm text-gray-500 mt-1">Full history of AI model actions, policy events, and risk flags</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-gray-500" />
            <CardTitle>Recent Events</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {auditEntries.map(entry => (
              <div key={entry.id} className={`px-6 py-4 ${entry.riskFlag ? 'bg-red-50' : 'hover:bg-gray-50'} transition-colors`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-0.5 flex-shrink-0 ${entry.riskFlag ? 'text-red-500' : 'text-green-500'}`}>
                      {entry.riskFlag ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{entry.modelName}</span>
                        {entry.riskFlag && (
                          <Badge className="bg-red-100 text-red-700">Risk Flag</Badge>
                        )}
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
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-xs font-medium ${entry.riskFlag ? 'text-red-600' : 'text-green-600'}`}>
                      {entry.outcome}
                    </span>
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
