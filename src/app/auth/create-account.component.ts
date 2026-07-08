import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./create-account.component.html",
})
export class CreateAccountComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  loading = false;
  error = "";
  form = inject(FormBuilder).nonNullable.group({
    displayName: [""],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = "";
    try {
      const v = this.form.getRawValue();
      await this.auth.createAccount(v.email, v.password, v.displayName);
      await this.router.navigateByUrl("/company-profile/setup");
    } catch (e) {
      this.error = "Unable to create account. Please try again.";
      this.loading = false;
    }
  }
}
