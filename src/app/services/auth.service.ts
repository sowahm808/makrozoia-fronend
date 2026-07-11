import { Injectable, inject } from "@angular/core";
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

  async createAccount(email: string, password: string, displayName?: string) {
    await this.persistenceReady;
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    return cred;
  }

  async login(email: string, password: string) {
    await this.persistenceReady;
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
