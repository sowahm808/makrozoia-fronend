import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User,
  authState,
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
  readonly user$: Observable<User | null> = authState(this.auth);

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

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
  }

  logout() {
    return signOut(this.auth);
  }

  async getIdToken(forceRefresh = false): Promise<string | null> {
    const user = this.auth.currentUser;

    if (!user) {
      return null;
    }

    return user.getIdToken(forceRefresh);
  }
}
