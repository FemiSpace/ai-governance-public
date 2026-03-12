'use client';

import { models } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { riskColor, modelStatusColor, biasScoreColor, scoreColor, formatDate, fdaClassColor, euTierColor, pccpColor, fhirColor } from '@/lib/utils';
import { BotMessageSquare, Calendar, User, CheckCircle, XCircle } from 'lucide-react';

export default function ModelsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Model Registry</h1>
        <p className="text-sm text-gray-500 mt-1">All AI models — FDA classification, EU risk tier, PCCP, and FHIR status</p>
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
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <Badge className={modelStatusColor(m.status)}>{m.status}</Badge>
                  <Badge className={riskColor(m.riskLevel)}>{m.riskLevel} risk</Badge>
                  <Badge className={fdaClassColor(m.fdaClass)}>{m.fdaClass}</Badge>
                  <Badge className={euTierColor(m.euRiskTier)}>{m.euRiskTier}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
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
                  <p className="text-xs text-gray-500 mb-1">Fairness</p>
                  <p className={`text-xl font-bold ${scoreColor(m.fairnessScore)}`}>{m.fairnessScore}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">PCCP</p>
                  <Badge className={pccpColor(m.pccp)}>{m.pccp}</Badge>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">FHIR</p>
                  <Badge className={fhirColor(m.fhirStatus)}>{m.fhirStatus}</Badge>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Explainability</p>
                  <div className={`flex items-center gap-1 text-xs font-medium ${m.explainabilityEnabled ? 'text-green-600' : 'text-red-500'}`}>
                    {m.explainabilityEnabled ? <CheckCircle size={13} /> : <XCircle size={13} />}
                    {m.explainabilityEnabled ? 'Enabled' : 'Missing'}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">HITL Required</p>
                  <div className={`flex items-center gap-1 text-xs font-medium ${m.hitlRequired ? 'text-orange-600' : 'text-green-600'}`}>
                    {m.hitlRequired ? <CheckCircle size={13} /> : <XCircle size={13} />}
                    {m.hitlRequired ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><User size={11} />{m.owner}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />Deployed {formatDate(m.deployedAt)}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />Last audit {formatDate(m.lastAudit)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
