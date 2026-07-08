import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { switchMap, of } from "rxjs";
import { CompanyProfileFormComponent } from "../../shared/company-profile-form.component";
import {
  CompanyProfile,
  CompanyProfileFormValue,
} from "../../models/company-profile.model";
import { AuthService } from "../../services/auth.service";
import { CompanyProfileService } from "../../services/company-profile.service";
@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink, CompanyProfileFormComponent],
  templateUrl: "./company-profile.component.html",
})
export class CompanyProfileComponent {
  private auth = inject(AuthService);
  private profiles = inject(CompanyProfileService);
  loading = false;
  success = false;
  error = "";
  profile$ = this.auth.user$.pipe(
    switchMap((user) =>
      user ? this.profiles.getProfileByUid(user.uid) : of(null),
    ),
  );
  async save(profile: CompanyProfile, value: CompanyProfileFormValue) {
    if (!profile.id) return;
    this.loading = true;
    this.error = "";
    this.success = false;
    try {
      await this.profiles.updateProfile(profile.id, value);
      this.success = true;
    } catch (e) {
      this.error = "Could not update profile.";
    } finally {
      this.loading = false;
    }
  }
}
