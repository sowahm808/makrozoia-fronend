import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";
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

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const sessionRoutes = inject(SessionRouteService);

  return inject(AuthService).user$.pipe(
    take(1),
    map((user) =>
      user ? router.parseUrl(sessionRoutes.resolveRedirectUrl()) : true,
    ),
  );
};
