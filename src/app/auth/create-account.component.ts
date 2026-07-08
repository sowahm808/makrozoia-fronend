import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: ` <section class="auth">
    <form class="card" [formGroup]="form" (ngSubmit)="submit()">
      <h1>Create Account</h1>
      <label>Name<input formControlName="displayName" /></label
      ><label>Email<input formControlName="email" type="email" /></label
      ><label>Password<input formControlName="password" type="password" /></label>
      @if (error) {
        <p class="error">{{ error }}</p>
      }
      <button class="button" [disabled]="form.invalid || loading">
        {{ loading ? "Creating…" : "Create account" }}</button
      ><p>Already registered? <a routerLink="/login">Login</a></p>
    </form>
  </section>`,
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
