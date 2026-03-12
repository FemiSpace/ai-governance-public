export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type PolicyStatus = 'draft' | 'active' | 'archived';
export type ComplianceStatus = 'compliant' | 'at-risk' | 'non-compliant' | 'pending' | 'in-progress';
export type ModelStatus = 'development' | 'staging' | 'production' | 'retired';
export type FDAClass = 'SaMD' | 'CDS-device' | 'CDS-non-device' | 'General Wellness' | 'Non-device Software';
export type EURiskTier = 'High-Risk' | 'Limited Risk' | 'Minimal Risk' | 'Prohibited';
export type PCCPStatus = 'approved' | 'pending' | 'not-required' | 'in-progress';
export type FHIRStatus = 'live' | 'in-progress' | 'planned' | 'not-applicable';
export type RoadmapStatus = 'complete' | 'in-progress' | 'upcoming' | 'blocked';
export type PrincipleStatus = 'implemented' | 'partial' | 'planned';
export type DisclosureStatus = 'compliant' | 'gap' | 'not-applicable' | 'in-progress';

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
  biasScore: number;
  accuracyScore: number;
  fairnessScore: number;
  fdaClass: FDAClass;
  euRiskTier: EURiskTier;
  pccp: PCCPStatus;
  fhirStatus: FHIRStatus;
  explainabilityEnabled: boolean;
  hitlRequired: boolean;
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
  frameworks: string[];
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
  incidentReport: boolean;
  details: string;
  category: 'bias' | 'compliance' | 'policy' | 'security' | 'hitl' | 'performance' | 'incident';
}

export interface ComplianceFramework {
  id: string;
  name: string;
  shortName: string;
  category: 'regulation' | 'standard' | 'state-law' | 'interoperability';
  jurisdiction: string;
  status: ComplianceStatus;
  score: number;
  lastReview: string;
  nextReview: string;
  openIssues: number;
  totalControls: number;
  passedControls: number;
  mandatory: boolean;
  deadline?: string;
  notes?: string;
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

export interface UseCaseRisk {
  id: string;
  useCase: string;
  fdaClass: FDAClass;
  fdaNotes: string;
  euRiskTier: EURiskTier;
  stateExposure: 'high' | 'medium' | 'low';
  stateNotes: string;
  overallRisk: RiskLevel;
  pccp: boolean;
  hitlRequired: boolean;
  disclosureRequired: boolean;
}

export interface StateDisclosure {
  state: string;
  law: string;
  requirement: string;
  effectiveDate: string;
  status: DisclosureStatus;
  penalty?: string;
}

export interface RoadmapPhase {
  id: string;
  phase: string;
  timeframe: string;
  status: RoadmapStatus;
  actions: { text: string; done: boolean }[];
  milestone: string;
  completionPct: number;
}

export interface GovernancePrinciple {
  id: string;
  number: number;
  title: string;
  description: string;
  status: PrincipleStatus;
  evidence: string;
}

export interface DashboardStats {
  totalModels: number;
  activeModels: number;
  highRiskModels: number;
  activePolicies: number;
  openAuditFlags: number;
  avgBiasScore: number;
  complianceRate: number;
  iso42001Status: 'certified' | 'in-progress' | 'planned';
  pccpApproved: number;
  fhirLive: number;
  openIncidents: number;
  stateComplianceGaps: number;
}
