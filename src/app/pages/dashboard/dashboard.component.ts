import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { switchMap, of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CompanyProfileService } from "../../services/company-profile.service";
import {
  CompanyProfile,
  POC_STATUS_OPTIONS,
  PocStatus,
} from "../../models/company-profile.model";
@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private profiles = inject(CompanyProfileService);
  readonly statusOptions = POC_STATUS_OPTIONS;

  private readonly statusProgress: Record<PocStatus, number> = {
    Accepted: 25,
    "In progress": 50,
    Deployed: 75,
    Delivered: 100,
  };

  private readonly statusDescriptions: Record<PocStatus, string> = {
    Accepted: "Your POC request has been accepted and is queued for planning.",
    "In progress": "Makrozoia is actively building and validating your POC.",
    Deployed: "Your POC has been deployed for final review and feedback.",
    Delivered: "Your POC has been delivered and is ready for next-step planning.",
  };

  profile$ = this.auth.user$.pipe(
    switchMap((user) =>
      user ? this.profiles.getProfileByUid(user.uid) : of(null),
    ),
  );

  getStatus(profile: CompanyProfile): PocStatus {
    return profile.pocStatus ?? "Accepted";
  }

  getProgress(profile: CompanyProfile): number {
    return this.getProgressForStatus(this.getStatus(profile));
  }

  getProgressForStatus(status: PocStatus): number {
    return this.statusProgress[status];
  }

  getStatusDescription(profile: CompanyProfile): string {
    return this.statusDescriptions[this.getStatus(profile)];
  }
}
