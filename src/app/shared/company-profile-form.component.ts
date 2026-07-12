import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import {
  COMPANY_SIZE_OPTIONS,
  PROJECT_STAGE_OPTIONS,
  SERVICES_INTERESTED_OPTIONS,
  TIMELINE_OPTIONS,
  CompanyProfile,
  CompanyProfileFormValue,
} from "../models/company-profile.model";
import { buildCompanyProfileForm } from "./profile-form.util";
@Component({
  selector: "app-company-profile-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./company-profile-form.component.html",
})
export class CompanyProfileFormComponent {
  private readonly requiredFieldLabels: Record<string, string> = {
    companyName: "Company name",
    industry: "Industry",
    companySize: "Company size",
    businessType: "Business type",
    headquartersLocation: "Headquarters location",
    companyDescription: "Company description",
    contactPersonName: "Contact person",
    contactEmail: "Email",
    servicesInterestedIn: "Services requested",
    projectStage: "Project stage",
    preferredTimeline: "Preferred timeline",
    pocGoal: "POC goal",
    businessChallenge: "Business challenge",
    desiredOutcomes: "Desired outcomes",
  };
  submitted = false;
  private fb = inject(FormBuilder);
  @Input() title = "Company Profile";
  @Input() submitLabel = "Save Profile";
  @Input() loading = false;
  @Output() save = new EventEmitter<CompanyProfileFormValue>();
  sizes = COMPANY_SIZE_OPTIONS;
  services = SERVICES_INTERESTED_OPTIONS;
  projectStages = PROJECT_STAGE_OPTIONS;
  timelines = TIMELINE_OPTIONS;
  form = buildCompanyProfileForm(this.fb);
  @Input() set profile(value: CompanyProfile | null | undefined) {
    this.form = buildCompanyProfileForm(this.fb, value);
  }
  selected(service: string) {
    return this.form.controls.servicesInterestedIn.value.includes(service);
  }
  toggleService(service: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.form.controls.servicesInterestedIn.value;
    this.form.controls.servicesInterestedIn.setValue(
      checked
        ? [...current, service]
        : current.filter((item) => item !== service),
    );
    this.form.controls.servicesInterestedIn.markAsTouched();
    this.form.controls.servicesInterestedIn.updateValueAndValidity();
  }
  invalidRequiredFields() {
    return Object.entries(this.requiredFieldLabels)
      .filter(([controlName]) => {
        const control = this.form.get(controlName);
        return control?.invalid && (control.touched || this.submitted);
      })
      .map(([, label]) => label);
  }
  submit() {
    this.submitted = true;
    this.form.markAllAsTouched();
    if (this.form.valid) this.save.emit(this.form.getRawValue());
  }
}
