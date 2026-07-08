import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs';
export const authGuard: CanActivateFn = () => { const router = inject(Router); return inject(AuthService).user$.pipe(take(1), map(user => user ? true : router.createUrlTree(['/login']))); };
export const guestGuard: CanActivateFn = () => { const router = inject(Router); return inject(AuthService).user$.pipe(take(1), map(user => user ? router.createUrlTree(['/dashboard']) : true)); };
