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
  "Proof of Concept",
  "MVP Development",
  "Full Implementation",
  "Cloud Migration",
  "Legacy Modernization",
  "AI Solutions",
  "DevOps Automation",
  "Architecture Review",
  "System Integration",
  "Technical Consulting",
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
  createdByUid: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}
export type CompanyProfileFormValue = Omit<
  CompanyProfile,
  "id" | "createdByUid" | "createdAt" | "updatedAt"
>;
