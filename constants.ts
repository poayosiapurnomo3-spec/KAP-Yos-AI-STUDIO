import { ActivityType, Engagement, Staff, TimeEntry } from './types';

export const CURRENT_USER: Staff = {
  id: 'EMP-001',
  fullName: 'Poa Yosia',
  department: 'Audit Assurance',
  billableRate: 250,
};

export const MOCK_ENGAGEMENTS: Engagement[] = [
  {
    id: 'ENG-2024-001',
    clientId: 'CLT-505',
    clientName: 'Megacorp Industries',
    engagementName: 'Annual Audit 2023',
    partnerInCharge: 'Sarah Jenkins',
    contractValue: 150000,
    remainingValue: 45000,
    status: 'Active',
  },
  {
    id: 'ENG-2024-002',
    clientId: 'CLT-102',
    clientName: 'TechNova Solutions',
    engagementName: 'Tax Advisory Q1',
    partnerInCharge: 'Michael Ross',
    contractValue: 35000,
    remainingValue: 12000,
    status: 'Active',
  },
  {
    id: 'ENG-2024-003',
    clientId: 'CLT-889',
    clientName: 'GreenLeaf Retail',
    engagementName: 'Due Diligence - Merger',
    partnerInCharge: 'Sarah Jenkins',
    contractValue: 75000,
    remainingValue: 70000,
    status: 'Pending',
  },
  {
    id: 'ENG-2024-004',
    clientId: 'CLT-404',
    clientName: 'Oceanic Shipping',
    engagementName: 'Forensic Audit',
    partnerInCharge: 'David Kim',
    contractValue: 200000,
    remainingValue: 0,
    status: 'Closed',
  },
];

export const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: 'TE-1001',
    engagementId: 'ENG-2024-001',
    date: '2024-05-20',
    hoursSpent: 4.5,
    activityType: ActivityType.AUDIT_FIELDWORK,
    isBillable: true,
    notes: 'Inventory count observation',
  },
  {
    id: 'TE-1002',
    engagementId: 'ENG-2024-002',
    date: '2024-05-21',
    hoursSpent: 2.0,
    activityType: ActivityType.TAX_COMPLIANCE,
    isBillable: true,
    notes: 'Drafting preliminary tax memo',
  },
  {
    id: 'TE-1003',
    engagementId: 'INTERNAL',
    date: '2024-05-21',
    hoursSpent: 1.5,
    activityType: ActivityType.INTERNAL_ADMIN,
    isBillable: false,
    notes: 'Staff meeting',
  },
];

export const UTILIZATION_DATA = [
  { name: 'Billable', value: 75, fill: '#10b981' }, // emerald-500
  { name: 'Non-Billable', value: 25, fill: '#475569' }, // slate-600
];

export const REVENUE_DATA = [
  { month: 'Jan', target: 400, realized: 380 },
  { month: 'Feb', target: 420, realized: 430 },
  { month: 'Mar', target: 450, realized: 410 },
  { month: 'Apr', target: 450, realized: 460 },
  { month: 'May', target: 480, realized: 475 },
];

export const AGING_AR_DATA = [
  { range: '0-30 Days', amount: 120000 },
  { range: '31-60 Days', amount: 45000 },
  { range: '> 60 Days', amount: 15000 },
];

export const ACTIVITY_OPTIONS = Object.values(ActivityType);