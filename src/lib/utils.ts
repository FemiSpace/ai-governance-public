import type { RiskLevel, ComplianceStatus, PolicyStatus, ModelStatus } from '@/types';

export function riskColor(level: RiskLevel): string {
  return {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  }[level];
}

export function complianceColor(status: ComplianceStatus): string {
  return {
    compliant: 'bg-green-100 text-green-800',
    'at-risk': 'bg-yellow-100 text-yellow-800',
    'non-compliant': 'bg-red-100 text-red-800',
  }[status];
}

export function policyStatusColor(status: PolicyStatus): string {
  return {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-blue-100 text-blue-800',
    archived: 'bg-gray-100 text-gray-600',
  }[status];
}

export function modelStatusColor(status: ModelStatus): string {
  return {
    production: 'bg-green-100 text-green-800',
    staging: 'bg-blue-100 text-blue-800',
    development: 'bg-purple-100 text-purple-800',
    retired: 'bg-gray-100 text-gray-600',
  }[status];
}

export function biasStatusColor(status: 'pass' | 'warn' | 'fail'): string {
  return {
    pass: 'bg-green-100 text-green-800',
    warn: 'bg-yellow-100 text-yellow-800',
    fail: 'bg-red-100 text-red-800',
  }[status];
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
