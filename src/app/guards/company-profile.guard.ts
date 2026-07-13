import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { from, map, of, switchMap, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { CompanyProfileService } from "../services/company-profile.service";

export const companyProfileCompleteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const profiles = inject(CompanyProfileService);

  return auth.user$.pipe(
    take(1),
    switchMap((user) => {
      if (!user) {
        return of(router.createUrlTree(["/login"]));
      }

      return from(auth.isAdmin(user)).pipe(
        switchMap((isAdmin) => {
          if (isAdmin) {
            return of(router.createUrlTree(["/admin"]));
          }

          return profiles.getProfileByUid(user.uid).pipe(
            take(1),
            map((profile) =>
              profile ? true : router.createUrlTree(["/company-profile/setup"]),
            ),
          );
        }),
      );
    }),
  );
};

export const companyProfileSetupGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const profiles = inject(CompanyProfileService);

  return auth.user$.pipe(
    take(1),
    switchMap((user) => {
      if (!user) {
        return of(router.createUrlTree(["/login"]));
      }

      return from(auth.isAdmin(user)).pipe(
        switchMap((isAdmin) => {
          if (isAdmin) {
            return of(router.createUrlTree(["/admin"]));
          }

          return profiles.getProfileByUid(user.uid).pipe(
            take(1),
            map((profile) =>
              profile ? router.createUrlTree(["/dashboard"]) : true,
            ),
          );
        }),
      );
    }),
  );
};
