import type { RiskLevel, ComplianceStatus, PolicyStatus, ModelStatus, PCCPStatus, FHIRStatus, RoadmapStatus, PrincipleStatus, DisclosureStatus, FDAClass, EURiskTier } from '@/types';

export function riskColor(level: RiskLevel): string {
  return { low: 'bg-green-100 text-green-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-orange-100 text-orange-800', critical: 'bg-red-100 text-red-800' }[level];
}
export function complianceColor(status: ComplianceStatus): string {
  return { compliant: 'bg-green-100 text-green-800', 'at-risk': 'bg-yellow-100 text-yellow-800', 'non-compliant': 'bg-red-100 text-red-800', pending: 'bg-blue-100 text-blue-800', 'in-progress': 'bg-purple-100 text-purple-800' }[status] ?? 'bg-gray-100 text-gray-600';
}
export function policyStatusColor(status: PolicyStatus): string {
  return { active: 'bg-green-100 text-green-800', draft: 'bg-blue-100 text-blue-800', archived: 'bg-gray-100 text-gray-600' }[status];
}
export function modelStatusColor(status: ModelStatus): string {
  return { production: 'bg-green-100 text-green-800', staging: 'bg-blue-100 text-blue-800', development: 'bg-purple-100 text-purple-800', retired: 'bg-gray-100 text-gray-600' }[status];
}
export function biasStatusColor(status: 'pass' | 'warn' | 'fail'): string {
  return { pass: 'bg-green-100 text-green-800', warn: 'bg-yellow-100 text-yellow-800', fail: 'bg-red-100 text-red-800' }[status];
}
export function pccpColor(status: PCCPStatus): string {
  return { approved: 'bg-green-100 text-green-800', pending: 'bg-yellow-100 text-yellow-800', 'not-required': 'bg-gray-100 text-gray-600', 'in-progress': 'bg-blue-100 text-blue-800' }[status];
}
export function fhirColor(status: FHIRStatus): string {
  return { live: 'bg-green-100 text-green-800', 'in-progress': 'bg-blue-100 text-blue-800', planned: 'bg-yellow-100 text-yellow-800', 'not-applicable': 'bg-gray-100 text-gray-600' }[status];
}
export function roadmapStatusColor(status: RoadmapStatus): string {
  return { complete: 'bg-green-100 text-green-800', 'in-progress': 'bg-blue-100 text-blue-800', upcoming: 'bg-gray-100 text-gray-600', blocked: 'bg-red-100 text-red-800' }[status];
}
export function principleStatusColor(status: PrincipleStatus): string {
  return { implemented: 'bg-green-100 text-green-800', partial: 'bg-yellow-100 text-yellow-800', planned: 'bg-gray-100 text-gray-600' }[status];
}
export function disclosureColor(status: DisclosureStatus): string {
  return { compliant: 'bg-green-100 text-green-800', gap: 'bg-red-100 text-red-800', 'not-applicable': 'bg-gray-100 text-gray-600', 'in-progress': 'bg-blue-100 text-blue-800' }[status];
}
export function fdaClassColor(c: FDAClass): string {
  return { 'SaMD': 'bg-red-100 text-red-800', 'CDS-device': 'bg-orange-100 text-orange-800', 'CDS-non-device': 'bg-yellow-100 text-yellow-800', 'General Wellness': 'bg-green-100 text-green-800', 'Non-device Software': 'bg-gray-100 text-gray-600' }[c];
}
export function euTierColor(tier: EURiskTier): string {
  return { 'High-Risk': 'bg-red-100 text-red-800', 'Limited Risk': 'bg-yellow-100 text-yellow-800', 'Minimal Risk': 'bg-green-100 text-green-800', 'Prohibited': 'bg-red-200 text-red-900' }[tier];
}
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
export function scoreColor(score: number): string {
  if (score >= 85) return 'text-green-600';
  if (score >= 70) return 'text-yellow-600';
  return 'text-red-600';
}
export function biasScoreColor(score: number): string {
  if (score <= 15) return 'text-green-600';
  if (score <= 25) return 'text-yellow-600';
  return 'text-red-600';
}
export function categoryIcon(category: string): string {
  return { bias: '⚖️', compliance: '✅', policy: '📋', security: '🔒', hitl: '👩‍⚕️', performance: '📊', incident: '🚨' }[category] ?? '📝';
}
