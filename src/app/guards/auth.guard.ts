import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { from, map, of, switchMap, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { SessionRouteService } from "../services/session-route.service";

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const sessionRoutes = inject(SessionRouteService);

  return inject(AuthService).user$.pipe(
    take(1),
    map((user) => {
      if (user) {
        sessionRoutes.remember(state.url);
        return true;
      }

      return router.createUrlTree(["/login"], {
        queryParams: { returnUrl: state.url },
      });
    }),
  );
};

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.user$.pipe(
    take(1),
    switchMap((user) => {
      if (!user) {
        return of(
          router.createUrlTree(["/login"], {
            queryParams: { returnUrl: "/admin" },
          }),
        );
      }

      return from(auth.isAdmin(user)).pipe(
        map((isAdmin) =>
          isAdmin ? true : router.createUrlTree(["/dashboard"]),
        ),
      );
    }),
  );
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionRoutes = inject(SessionRouteService);
  const auth = inject(AuthService);

  return auth.user$.pipe(
    take(1),
    switchMap((user) => {
      if (!user) {
        return of(true);
      }

      return from(auth.isAdmin(user)).pipe(
        map((isAdmin) =>
          isAdmin
            ? router.parseUrl("/admin")
            : router.parseUrl(sessionRoutes.resolveRedirectUrl()),
        ),
      );
    }),
  );
};
