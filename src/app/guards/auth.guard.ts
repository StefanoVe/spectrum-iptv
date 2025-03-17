import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { XtreamService } from '../services/xtream.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(XtreamService);
  const router = inject(Router);

  if (!authService.config) {
    console.log('User is not authenticated');
    router.navigate(['/auth']);
    return false;
  }

  authService.getAccountInfo().pipe(
    catchError(() => {
      console.log('User is disabled');
      authService.clearConfig();
      router.navigate(['/auth']);
      return of(null);
    })
  );

  return true;
};
