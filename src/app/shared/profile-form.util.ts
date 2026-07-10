import { FormBuilder, Validators } from "@angular/forms";
import { CompanyProfile } from "../models/company-profile.model";

export function buildCompanyProfileForm(
  fb: FormBuilder,
  profile?: CompanyProfile | null,
) {
  return fb.nonNullable.group({
    companyName: [profile?.companyName ?? "", Validators.required],
    legalName: [profile?.legalName ?? ""],
    website: [profile?.website ?? ""],
    industry: [profile?.industry ?? "", Validators.required],
    companySize: [profile?.companySize ?? "", Validators.required],
    businessType: [profile?.businessType ?? "", Validators.required],
    headquartersLocation: [
      profile?.headquartersLocation ?? "",
      Validators.required,
    ],
    contactPersonName: [profile?.contactPersonName ?? "", Validators.required],
    contactPersonTitle: [profile?.contactPersonTitle ?? ""],
    contactEmail: [
      profile?.contactEmail ?? "",
      [Validators.required, Validators.email],
    ],
    contactPhone: [profile?.contactPhone ?? ""],
    companyDescription: [
      profile?.companyDescription ?? "",
      Validators.required,
    ],
    servicesInterestedIn: [
      profile?.servicesInterestedIn ?? [],
      Validators.required,
    ],
    projectStage: [profile?.projectStage ?? "", Validators.required],
    budgetRange: [profile?.budgetRange ?? ""],
    preferredTimeline: [
      profile?.preferredTimeline ?? "",
      Validators.required,
    ],
    currentTechStack: [profile?.currentTechStack ?? ""],
    modernizationNeeds: [profile?.modernizationNeeds ?? ""],
    cloudProvider: [profile?.cloudProvider ?? ""],
    aiInterest: [profile?.aiInterest ?? ""],
    pocGoal: [profile?.pocGoal ?? "", Validators.required],
    businessChallenge: [
      profile?.businessChallenge ?? "",
      Validators.required,
    ],
    targetUsers: [profile?.targetUsers ?? ""],
    desiredOutcomes: [profile?.desiredOutcomes ?? "", Validators.required],
    successCriteria: [profile?.successCriteria ?? ""],
    existingProcess: [profile?.existingProcess ?? ""],
    dataSources: [profile?.dataSources ?? ""],
    integrationsNeeded: [profile?.integrationsNeeded ?? ""],
    complianceRequirements: [profile?.complianceRequirements ?? ""],
    pocScopeNotes: [profile?.pocScopeNotes ?? ""],
  });
}
