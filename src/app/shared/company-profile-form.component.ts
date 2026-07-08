import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import {
  COMPANY_SIZE_OPTIONS,
  SERVICES_INTERESTED_OPTIONS,
  CompanyProfile,
  CompanyProfileFormValue,
} from "../models/company-profile.model";
import { buildCompanyProfileForm } from "./profile-form.util";
@Component({
  selector: "app-company-profile-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<form
    [formGroup]="form"
    (ngSubmit)="submit()"
    class="card form-grid"
  >
    <h2>{{ title }}</h2>
    <label>Company name<input formControlName="companyName" /></label
    ><label>Legal name<input formControlName="legalName" /></label
    ><label>Website<input formControlName="website" /></label
    ><label>Industry<input formControlName="industry" /></label
    ><label
      >Company size<select formControlName="companySize">
        <option value="">Select size</option>
        @for (size of sizes; track size) {
          <option [value]="size">{{ size }}</option>
        }
      </select></label
    ><label>Business type<input formControlName="businessType" /></label
    ><label
      >Headquarters location<input
        formControlName="headquartersLocation" /></label
    ><label>Contact person<input formControlName="contactPersonName" /></label
    ><label>Contact title<input formControlName="contactPersonTitle" /></label
    ><label>Email<input formControlName="contactEmail" /></label
    ><label>Phone<input formControlName="contactPhone" /></label
    ><label class="full"
      >Company description<textarea
        formControlName="companyDescription"
      ></textarea>
    </label>
    <fieldset class="full">
      <legend>Services interested in</legend>
      @for (service of services; track service) {
        <label class="check"
          ><input
            type="checkbox"
            [checked]="selected(service)"
            (change)="toggleService(service, $event)"
          />{{ service }}</label
        >
      }
    </fieldset>
    <label>Project stage<input formControlName="projectStage" /></label
    ><label>Budget range<input formControlName="budgetRange" /></label
    ><label
      >Preferred timeline<input formControlName="preferredTimeline" /></label
    ><label
      >Current tech stack<input formControlName="currentTechStack" /></label
    ><label class="full"
      >Modernization needs<textarea
        formControlName="modernizationNeeds"
      ></textarea></label
    ><label>Cloud provider<input formControlName="cloudProvider" /></label
    ><label>AI interest<input formControlName="aiInterest" /></label
    ><button class="button full" [disabled]="form.invalid || loading">
      {{ loading ? "Saving…" : submitLabel }}
    </button>
  </form>`,
})
export class CompanyProfileFormComponent {
  private fb = inject(FormBuilder);
  @Input() title = "Company Profile";
  @Input() submitLabel = "Save Profile";
  @Input() loading = false;
  @Output() save = new EventEmitter<CompanyProfileFormValue>();
  sizes = COMPANY_SIZE_OPTIONS;
  services = SERVICES_INTERESTED_OPTIONS;
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
  }
  submit() {
    if (this.form.valid) this.save.emit(this.form.getRawValue());
  }
}
