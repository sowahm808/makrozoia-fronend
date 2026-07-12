import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly contactUrl = `${environment.backendUrl}/api/contact`;

  submitContactForm(value: ContactSubmission): Promise<void> {
    return firstValueFrom(this.http.post<void>(this.contactUrl, value));
  }
}
