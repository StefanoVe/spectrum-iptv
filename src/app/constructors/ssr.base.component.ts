import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: ``,
})
export class SSRBaseComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  @Output() public componentStable = new EventEmitter<void>();
  @Output() public componentInit = new EventEmitter<void>();

  public destroyed$ = new Subject<void>();

  public get isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public componentInitialized() {
    return;
  }

  public ngOnInit(): void {
    this.componentInit.emit();
    this.componentInitialized();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    return;
  }

  public componentIsStable(): void {
    setTimeout(() => {
      this.componentStable.emit();
    }, 300);
  }

  public preloadImages(images: string[]): void {
    if (!this.isPlatformBrowser) {
      return;
    }
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }
}
