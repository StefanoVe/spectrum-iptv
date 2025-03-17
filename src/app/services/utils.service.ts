import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private platformId = inject(PLATFORM_ID);

  public get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  constructor() {}

  public asyncForEach<T = unknown>(
    array: T[],
    callback: (item: T, index: number, array: T[]) => Promise<void>
  ) {
    return new Promise<void>((resolve) => {
      array.forEach(async (item, index, array) => {
        await callback(item, index, array);
        if (index === array.length - 1) {
          resolve();
        }
      });
    });
  }
}
