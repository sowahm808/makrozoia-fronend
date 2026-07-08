import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { CompanyProfileService } from "../services/company-profile.service";
import { take } from "rxjs";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  private auth = inject(AuthService);
  private profiles = inject(CompanyProfileService);
  private router = inject(Router);
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
        .subscribe((p) =>
          this.router.navigateByUrl(p ? "/dashboard" : "/company-profile/setup"),
        );
    } catch (e) {
      this.error = "Unable to sign in. Check your credentials.";
      this.loading = false;
    }
  }
}
