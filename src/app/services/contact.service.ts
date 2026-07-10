import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, serverTimestamp, setDoc } from '@angular/fire/firestore';

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly firestore = inject(Firestore);
  private readonly collectionRef = collection(this.firestore, 'contactSubmissions');

  async submitContactForm(value: ContactSubmission): Promise<void> {
    const ref = doc(this.collectionRef);
    await setDoc(ref, {
      ...value,
      createdAt: serverTimestamp(),
    });
  }
}
