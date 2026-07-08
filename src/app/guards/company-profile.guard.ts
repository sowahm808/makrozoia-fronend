import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { switchMap, map, take, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CompanyProfileService } from '../services/company-profile.service';
export const companyProfileCompleteGuard: CanActivateFn = () => { const router = inject(Router); const profiles = inject(CompanyProfileService); return inject(AuthService).user$.pipe(take(1), switchMap(user => user ? profiles.getProfileByUid(user.uid).pipe(take(1), map(profile => profile ? true : router.createUrlTree(['/company-profile/setup']))) : of(router.createUrlTree(['/login'])))); };
export const companyProfileSetupGuard: CanActivateFn = () => { const router = inject(Router); const profiles = inject(CompanyProfileService); return inject(AuthService).user$.pipe(take(1), switchMap(user => user ? profiles.getProfileByUid(user.uid).pipe(take(1), map(profile => profile ? router.createUrlTree(['/dashboard']) : true)) : of(router.createUrlTree(['/login'])))); };
