<<<<<<< HEAD
import { Injectable, inject } from '@angular/core';
=======
import { Injectable, inject } from "@angular/core";
>>>>>>> 684a1eb24cd6eb3a88d7a08f8056b87a25aa4b2b
import {
  Auth,
  User,
  authState,
<<<<<<< HEAD
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);

=======
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly persistenceReady = setPersistence(
    this.auth,
    browserLocalPersistence,
  );
>>>>>>> 684a1eb24cd6eb3a88d7a08f8056b87a25aa4b2b
  readonly user$: Observable<User | null> = authState(this.auth);

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

<<<<<<< HEAD
  async createAccount(
    email: string,
    password: string,
    displayName?: string,
  ) {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password,
    );

    if (displayName?.trim()) {
      await updateProfile(credential.user, {
        displayName: displayName.trim(),
      });

      // Refresh the local user data after updating the profile.
      await credential.user.reload();
    }

    return credential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      password,
    );
=======
  async createAccount(email: string, password: string, displayName?: string) {
    await this.persistenceReady;
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    return cred;
  }

  async login(email: string, password: string) {
    await this.persistenceReady;
    return signInWithEmailAndPassword(this.auth, email, password);
>>>>>>> 684a1eb24cd6eb3a88d7a08f8056b87a25aa4b2b
  }

  logout() {
    return signOut(this.auth);
  }
<<<<<<< HEAD

  async getIdToken(forceRefresh = false): Promise<string | null> {
    const user = this.auth.currentUser;

    if (!user) {
      return null;
    }

    return user.getIdToken(forceRefresh);
  }
}
=======
}
>>>>>>> 684a1eb24cd6eb3a88d7a08f8056b87a25aa4b2b
