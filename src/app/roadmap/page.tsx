'use client';

import { roadmapPhases, governancePrinciples } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { roadmapStatusColor, principleStatusColor } from '@/lib/utils';
import { Route, CheckCircle2, Circle, Shield } from 'lucide-react';

export default function RoadmapPage() {
  const totalActions = roadmapPhases.flatMap(p => p.actions).length;
  const doneActions = roadmapPhases.flatMap(p => p.actions).filter(a => a.done).length;
  const overallPct = Math.round((doneActions / totalActions) * 100);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Implementation Roadmap</h1>
        <p className="text-sm text-gray-500 mt-1">Phased AI governance maturity program — aligned with NIST AI RMF, ISO 42001, FDA, and EU AI Act</p>
      </div>

      {/* Overall progress */}
      <Card className="mb-8">
        <CardContent className="py-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-semibold text-gray-700">Overall Governance Maturity</p>
              <p className="text-xs text-gray-400">{doneActions} of {totalActions} actions complete across all phases</p>
            </div>
            <span className="text-3xl font-bold text-indigo-600">{overallPct}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${overallPct}%` }} />
          </div>
        </CardContent>
      </Card>

      {/* Phases */}
      <div className="space-y-5 mb-10">
        {roadmapPhases.map((phase, idx) => (
          <Card key={phase.id} className={phase.status === 'in-progress' ? 'border-indigo-300 shadow-md' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    phase.status === 'complete' ? 'bg-green-100 text-green-700' :
                    phase.status === 'in-progress' ? 'bg-indigo-100 text-indigo-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>{idx}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{phase.phase}</CardTitle>
                      <Badge className={roadmapStatusColor(phase.status)}>{phase.status}</Badge>
                      {phase.status === 'in-progress' && <span className="text-xs text-indigo-600 font-medium">← Current</span>}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{phase.timeframe}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`text-2xl font-bold ${phase.completionPct === 100 ? 'text-green-600' : phase.completionPct > 0 ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {phase.completionPct}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className={`h-full rounded-full ${phase.completionPct === 100 ? 'bg-green-500' : 'bg-indigo-500'}`}
                  style={{ width: `${phase.completionPct}%` }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                {phase.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2">
                    {action.done
                      ? <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                      : <Circle size={14} className="text-gray-300 flex-shrink-0 mt-0.5" />}
                    <span className={`text-xs ${action.done ? 'text-gray-600 line-through decoration-gray-300' : 'text-gray-700'}`}>{action.text}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500"><span className="font-medium">Milestone:</span> {phase.milestone}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 7 Principles */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-fuchsia-600" />
          <h2 className="text-base font-semibold text-gray-900">The 7 Non-Negotiable AI Governance Principles</h2>
        </div>
        <p className="text-sm text-gray-500 mb-4">Every AI decision must be traceable to these principles — the intersection of NIST AI RMF, ISO 42001, EU AI Act, and FDA guidance.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {governancePrinciples.map(p => (
            <Card key={p.id} className={p.status === 'implemented' ? 'border-green-200' : p.status === 'partial' ? 'border-yellow-200' : 'border-gray-200'}>
              <CardContent className="py-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{p.number}</span>
                    <span className="font-semibold text-sm text-gray-900">{p.title}</span>
                  </div>
                  <Badge className={principleStatusColor(p.status)}>{p.status}</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{p.description}</p>
                <p className="text-xs text-gray-400 italic">{p.evidence}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
