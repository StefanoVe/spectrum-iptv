import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, firstValueFrom, of } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { XtreamService } from '../services/xtream.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(XtreamService);
  const router = inject(Router);
  const utils = inject(UtilsService);

  if (!utils.isBrowser) {
    return false;
  }

  if (!authService.config.baseUrl || !authService.config.auth) {
    console.log('User is not authenticated');
    router.navigate(['/auth']);
    return false;
  }

  await firstValueFrom(
    authService.getAccountInfo().pipe(
      catchError(() => {
        console.log('User is disabled');
        authService.clearConfig();
        router.navigate(['/auth']);
        return of(null);
      })
    )
  );

  return true;
};
