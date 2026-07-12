import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {
  CompanyProfile,
  POC_STATUS_OPTIONS,
  PocStatus,
} from "../../models/company-profile.model";
import { CompanyProfileService } from "../../services/company-profile.service";

@Component({
  standalone: true,
  imports: [AsyncPipe, DatePipe, FormsModule, RouterLink],
  templateUrl: "./admin-dashboard.component.html",
})
export class AdminDashboardComponent {
  private profiles = inject(CompanyProfileService);

  readonly statusOptions = POC_STATUS_OPTIONS;
  readonly clients$ = this.profiles.getAllProfiles();
  updatingClientId: string | null = null;
  error = "";

  getStatus(profile: CompanyProfile): PocStatus {
    return profile.pocStatus ?? "Accepted";
  }

  countByStatus(clients: CompanyProfile[], status: PocStatus): number {
    return clients.filter((client) => this.getStatus(client) === status).length;
  }

  async updateStatus(profile: CompanyProfile, status: PocStatus) {
    if (!profile.id || this.getStatus(profile) === status) {
      return;
    }

    this.error = "";
    this.updatingClientId = profile.id;

    try {
      await this.profiles.updatePocStatus(profile.id, status);
    } catch (error) {
      this.error =
        error instanceof Error
          ? error.message
          : "Unable to update the POC status. Please try again.";
    } finally {
      this.updatingClientId = null;
    }
  }

  toDate(value: CompanyProfile["updatedAt"]): Date | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value;
    }

    return value.toDate();
  }
}
