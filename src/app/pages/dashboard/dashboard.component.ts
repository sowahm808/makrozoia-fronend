import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RouterLink } from "@angular/router";
import { switchMap, of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CompanyProfileService } from "../../services/company-profile.service";
@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private profiles = inject(CompanyProfileService);
  profile$ = this.auth.user$.pipe(
    switchMap((user) =>
      user ? this.profiles.getProfileByUid(user.uid) : of(null),
    ),
  );
}
