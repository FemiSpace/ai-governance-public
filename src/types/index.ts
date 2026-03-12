export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type PolicyStatus = 'draft' | 'active' | 'archived';
export type ComplianceStatus = 'compliant' | 'at-risk' | 'non-compliant';
export type ModelStatus = 'development' | 'staging' | 'production' | 'retired';

export interface AIModel {
  id: string;
  name: string;
  version: string;
  status: ModelStatus;
  purpose: string;
  riskLevel: RiskLevel;
  owner: string;
  deployedAt: string;
  lastAudit: string;
  biasScore: number; // 0–100 lower is better
  accuracyScore: number;
  fairnessScore: number;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  status: PolicyStatus;
  version: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  applicableModels: string[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  modelId: string;
  modelName: string;
  action: string;
  actor: string;
  outcome: string;
  riskFlag: boolean;
  details: string;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  status: ComplianceStatus;
  score: number;
  lastReview: string;
  nextReview: string;
  openIssues: number;
  totalControls: number;
  passedControls: number;
}

export interface BiasMetric {
  modelId: string;
  modelName: string;
  demographic: string;
  metric: string;
  value: number;
  threshold: number;
  status: 'pass' | 'warn' | 'fail';
}

export interface DashboardStats {
  totalModels: number;
  activeModels: number;
  highRiskModels: number;
  activePolicies: number;
  openAuditFlags: number;
  avgBiasScore: number;
  complianceRate: number;
}
