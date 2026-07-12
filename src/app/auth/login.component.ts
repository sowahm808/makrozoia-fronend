import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { CompanyProfileService } from "../services/company-profile.service";
import { SessionRouteService } from "../services/session-route.service";
import { take } from "rxjs";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  private auth = inject(AuthService);
  private profiles = inject(CompanyProfileService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sessionRoutes = inject(SessionRouteService);
  loading = false;
  error = "";
  form = inject(FormBuilder).nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = "";
    try {
      const cred = await this.auth.login(
        this.form.value.email!,
        this.form.value.password!,
      );
      this.profiles
        .getProfileByUid(cred.user.uid)
        .pipe(take(1))
        .subscribe((p) => {
          const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
          const destination = p
            ? this.sessionRoutes.resolveRedirectUrl(returnUrl)
            : "/company-profile/setup";

          this.router.navigateByUrl(destination);
        });
    } catch (e) {
      this.error = "Unable to sign in. Check your credentials.";
      this.loading = false;
    }
  }
}
