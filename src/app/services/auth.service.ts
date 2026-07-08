import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);
  readonly user$: Observable<User | null> = authState(this.auth);
  get currentUser(): User | null { return this.auth.currentUser; }
  createAccount(email: string, password: string, displayName?: string) { return createUserWithEmailAndPassword(this.auth, email, password).then(async cred => { if (displayName) await updateProfile(cred.user, { displayName }); return cred; }); }
  login(email: string, password: string) { return signInWithEmailAndPassword(this.auth, email, password); }
  logout() { return signOut(this.auth); }
}
