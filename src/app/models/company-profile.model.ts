import { Timestamp } from "firebase/firestore";

export const COMPANY_SIZE_OPTIONS = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "501–1000",
  "1000+",
] as const;

export const SERVICES_INTERESTED_OPTIONS = [
  "Free proof of concept",
  "Product discovery",
  "MVP development",
  "Custom software development",
  "Cloud migration",
  "Legacy modernization",
  "AI automation",
  "DevOps automation",
  "Architecture review",
  "System integration",
  "Technical consulting",
] as const;

export const PROJECT_STAGE_OPTIONS = [
  "Idea or early discovery",
  "Requirements are documented",
  "Existing product needs improvement",
  "Scaling or modernization",
  "Ready to start POC",
] as const;

export const TIMELINE_OPTIONS = [
  "ASAP",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "This quarter",
  "Flexible / exploring",
] as const;

export interface CompanyProfile {
  id?: string;
  companyName: string;
  legalName: string;
  website: string;
  industry: string;
  companySize: string;
  businessType: string;
  headquartersLocation: string;
  contactPersonName: string;
  contactPersonTitle: string;
  contactEmail: string;
  contactPhone: string;
  companyDescription: string;
  servicesInterestedIn: string[];
  projectStage: string;
  budgetRange: string;
  preferredTimeline: string;
  currentTechStack: string;
  modernizationNeeds: string;
  cloudProvider: string;
  aiInterest: string;
  pocGoal: string;
  businessChallenge: string;
  targetUsers: string;
  desiredOutcomes: string;
  successCriteria: string;
  existingProcess: string;
  dataSources: string;
  integrationsNeeded: string;
  complianceRequirements: string;
  pocScopeNotes: string;
  createdByUid: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}

export type CompanyProfileFormValue = Omit<
  CompanyProfile,
  "id" | "createdByUid" | "createdAt" | "updatedAt"
>;
