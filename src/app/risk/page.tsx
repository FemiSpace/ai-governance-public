'use client';

import { useCaseRisks } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { riskColor, fdaClassColor, euTierColor } from '@/lib/utils';
import { AlertTriangle, CheckCircle, XCircle, ShieldAlert } from 'lucide-react';

export default function RiskPage() {
  const critical = useCaseRisks.filter(u => u.overallRisk === 'critical' || u.overallRisk === 'high');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Use Case Risk Classification</h1>
        <p className="text-sm text-gray-500 mt-1">FDA classification × EU AI Act risk tier × US state law exposure — per use case</p>
      </div>

      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Use Cases', value: useCaseRisks.length, color: 'text-indigo-600' },
          { label: 'High/Critical Risk', value: critical.length, color: 'text-red-600' },
          { label: 'PCCP Required', value: useCaseRisks.filter(u => u.pccp).length, color: 'text-orange-600' },
          { label: 'Disclosure Required', value: useCaseRisks.filter(u => u.disclosureRequired).length, color: 'text-yellow-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="py-4">
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-red-500" />
            <CardTitle>Use Case Risk Matrix</CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Based on FDA Jan 2026 CDS guidance, EU AI Act risk classification, and active state laws</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  {['Use Case', 'FDA Class', 'FDA Notes', 'EU Risk Tier', 'State Exposure', 'PCCP', 'HITL', 'Disclosure', 'Overall Risk'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {useCaseRisks.map(u => (
                  <tr key={u.id} className={`${u.overallRisk === 'critical' ? 'bg-red-50' : u.overallRisk === 'high' ? 'bg-orange-50' : ''} hover:bg-gray-50 transition-colors`}>
                    <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px]">{u.useCase}</td>
                    <td className="px-4 py-3"><Badge className={fdaClassColor(u.fdaClass)}>{u.fdaClass}</Badge></td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px]">{u.fdaNotes}</td>
                    <td className="px-4 py-3"><Badge className={euTierColor(u.euRiskTier)}>{u.euRiskTier}</Badge></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${u.stateExposure === 'high' ? 'text-red-600' : u.stateExposure === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                        {u.stateExposure}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={u.pccp ? 'text-red-500' : 'text-gray-400'}>
                        {u.pccp ? <CheckCircle size={15} /> : <XCircle size={15} />}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={u.hitlRequired ? 'text-orange-500' : 'text-gray-400'}>
                        {u.hitlRequired ? <CheckCircle size={15} /> : <XCircle size={15} />}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={u.disclosureRequired ? 'text-yellow-500' : 'text-gray-400'}>
                        {u.disclosureRequired ? <CheckCircle size={15} /> : <XCircle size={15} />}
                      </span>
                    </td>
                    <td className="px-4 py-3"><Badge className={riskColor(u.overallRisk)}>{u.overallRisk}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail cards */}
      <div className="space-y-4">
        {useCaseRisks.filter(u => u.overallRisk === 'critical' || u.overallRisk === 'high').map(u => (
          <Card key={u.id}>
            <CardContent className="py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={18} className={u.overallRisk === 'critical' ? 'text-red-500' : 'text-orange-500'} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{u.useCase}</span>
                    <Badge className={riskColor(u.overallRisk)}>{u.overallRisk}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                    <div><span className="font-medium text-gray-700">FDA: </span>{u.fdaNotes}</div>
                    <div><span className="font-medium text-gray-700">State laws: </span>{u.stateNotes}</div>
                  </div>
                  <div className="flex gap-3 mt-2">
                    {u.pccp && <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded-full">PCCP Required</span>}
                    {u.hitlRequired && <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">HITL Required</span>}
                    {u.disclosureRequired && <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">Patient Disclosure Required</span>}
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
