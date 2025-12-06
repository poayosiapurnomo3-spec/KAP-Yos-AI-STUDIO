export interface Staff {
  id: string;
  fullName: string;
  department: string;
  billableRate: number;
}

export interface Engagement {
  id: string;
  clientId: string;
  clientName: string;
  engagementName: string;
  partnerInCharge: string;
  contractValue: number;
  remainingValue: number;
  status: 'Active' | 'Pending' | 'Closed';
}

export interface TimeEntry {
  id: string;
  engagementId: string;
  date: string;
  hoursSpent: number;
  activityType: ActivityType;
  isBillable: boolean;
  notes: string;
}

export enum ActivityType {
  AUDIT_FIELDWORK = 'Audit Fieldwork',
  TAX_COMPLIANCE = 'Tax Compliance',
  ADVISORY_MEETING = 'Advisory Meeting',
  INTERNAL_ADMIN = 'Internal Admin',
  REVIEW = 'Review & QC',
}

export type ViewState = 'dashboard' | 'time-entry' | 'engagements' | 'analytics';
