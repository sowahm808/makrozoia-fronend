import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { CompanyProfileFormComponent } from "../../shared/company-profile-form.component";
import { CompanyProfileFormValue } from "../../models/company-profile.model";
import { AuthService } from "../../services/auth.service";
import { CompanyProfileService } from "../../services/company-profile.service";

@Component({
  standalone: true,
  imports: [CompanyProfileFormComponent],
  templateUrl: "./company-profile-setup.component.html",
})
export class CompanyProfileSetupComponent {
  private auth = inject(AuthService);
  private profiles = inject(CompanyProfileService);
  private router = inject(Router);
  loading = false;
  error = "";

  async save(value: CompanyProfileFormValue) {
    const user = this.auth.currentUser;
    if (!user) {
      await this.router.navigateByUrl("/login");
      return;
    }
    this.loading = true;
    try {
      await this.profiles.createProfile(user.uid, value);
      await this.router.navigateByUrl("/dashboard");
    } catch (e) {
      this.error = "Could not save company profile.";
      this.loading = false;
    }
  }
}
