import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly contactService = inject(ContactService);
  sent = false;
  loading = false;
  error = '';
  form = new FormBuilder().nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  async submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.error = '';
    this.sent = false;

    try {
      await this.contactService.submitContactForm(this.form.getRawValue());
      this.sent = true;
      this.form.reset();
    } catch (e) {
      this.error = 'Could not submit your request. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
