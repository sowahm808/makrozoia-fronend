import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="page narrow">
      <p class="eyebrow">Start a conversation</p>
      <h1>Tell us what you want to build, improve, or migrate.</h1>
      <p>
        Share a few details about your goals, current systems, timeline, or technical challenges. We will follow up
        to discuss the right next step, whether that is discovery, a POC, an MVP, or a full implementation plan.
      </p>
      <form class="card form-grid" [formGroup]="form" (ngSubmit)="sent = true">
        <label>Name<input formControlName="name" /></label>
        <label>Email<input formControlName="email" /></label>
        <label class="full">How can we help?<textarea formControlName="message"></textarea></label>
        <button class="button full" [disabled]="form.invalid">Request consultation</button>
        @if (sent) {
          <p class="success full">Thanks. We will follow up shortly.</p>
        }
      </form>
    </section>
  `,
})
export class ContactComponent {
  sent = false;
  form = new FormBuilder().nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });
}
