// src/app/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  // Do not attach Firebase tokens to unrelated external APIs.
  if (!request.url.startsWith(environment.backendUrl)) {
    return next(request);
  }

  return from(authService.getIdToken()).pipe(
    switchMap((token) => {
      if (!token) {
        return next(request);
      }

      const authenticatedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(authenticatedRequest);
    }),
  );
};