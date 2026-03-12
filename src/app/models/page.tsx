'use client';

import { models } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { riskColor, modelStatusColor, biasScoreColor, scoreColor, formatDate } from '@/lib/utils';
import { BotMessageSquare, Calendar, User } from 'lucide-react';

export default function ModelsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Model Registry</h1>
        <p className="text-sm text-gray-500 mt-1">All AI models deployed or in development across FemiSpace</p>
      </div>

      <div className="space-y-5">
        {models.map(m => (
          <Card key={m.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <BotMessageSquare size={20} />
                  </div>
                  <div>
                    <CardTitle>{m.name}</CardTitle>
                    <p className="text-xs text-gray-400 mt-0.5">v{m.version} · {m.purpose}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={modelStatusColor(m.status)}>{m.status}</Badge>
                  <Badge className={riskColor(m.riskLevel)}>{m.riskLevel} risk</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Bias Score</p>
                  <p className={`text-xl font-bold ${biasScoreColor(m.biasScore)}`}>{m.biasScore}</p>
                  <p className="text-[10px] text-gray-400">lower is better</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                  <p className={`text-xl font-bold ${scoreColor(m.accuracyScore)}`}>{m.accuracyScore}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Fairness Score</p>
                  <p className={`text-xl font-bold ${scoreColor(m.fairnessScore)}`}>{m.fairnessScore}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <User size={11} />
                    <span>{m.owner}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={11} />
                    <span>Deployed {formatDate(m.deployedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={11} />
                    <span>Audited {formatDate(m.lastAudit)}</span>
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
