import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'notify-app-title',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './app-title.component.html',
  styleUrls: ['./app-title.component.scss'],
})
export class AppTitleComponent {
  @Input() compact = false;
  @Input() sizes: {
    compact?: {
      width: number;
      height: number;
    };
    full?: {
      width: number;
      height: number;
    };
  } = {
    compact: {
      width: 100,
      height: 100,
    },
    full: {
      width: 2279,
      height: 772,
    },
  };

  @Input() subtitle = '';

  public get size() {
    if (this.compact) {
      return this.compactSize;
    }

    return this.fullSize;
  }

  public get fullSize() {
    if (!this.sizes.full) {
      return {
        width: 2279,
        height: 772,
      };
    }

    return this.sizes.full;
  }

  public get compactSize() {
    if (!this.sizes.compact) {
      return {
        width: 100,
        height: 100,
      };
    }

    return this.sizes.compact;
  }
}
