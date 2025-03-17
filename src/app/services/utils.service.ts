import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private _platformID = inject(PLATFORM_ID);

  public get isBrowser(): boolean {
    return isPlatformBrowser(this._platformID);
  }

  public currentTailwindMediaQuery():
    | 'none'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl' {
    if (!isPlatformBrowser(this._platformID)) {
      return 'none';
    }

    const width = window?.innerWidth;

    if (width >= 1536) {
      return '2xl';
    }

    if (width >= 1280) {
      return 'xl';
    }

    if (width >= 1024) {
      return 'lg';
    }

    if (width >= 768) {
      return 'md';
    }

    if (width >= 640) {
      return 'sm';
    }

    return 'none';
  }

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
