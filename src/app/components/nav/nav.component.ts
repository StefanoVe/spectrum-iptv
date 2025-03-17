import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { GestureController } from '@ionic/angular';

import { Observable } from 'rxjs';

import { UtilsService } from '../../services/utils.service';
import { AppTitleComponent } from '../app-title/app-title.component';

export interface NavItem {
  label: string;
  path: string;
  style?: string;
  icon: string[];
  disabled?: boolean;
  hidden?: boolean;
  canContainChildren?: boolean;
  badge?: 'AI';
}

@Component({
  selector: 'spectrum-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, AppTitleComponent],

  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @ViewChild('DrawerController')
  drawerController!: ElementRef<HTMLInputElement>;
  @Input({ required: true }) subtitle = '';
  @Input() bottomItems: NavItem[] = [
    {
      label: 'Log out',
      path: '/pages/signout',
      style: 'text-red-500 font-bold',
      icon: [
        'M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z',
      ],
    },
  ];
  @Input({ required: true }) topItems: NavItem[] = [];
  @Input() disableScrollOn?: HTMLElement;
  @Input() versionInfo!: {
    currentVersion: string;
    currentVersionDate: string | Date;
  };
  @Input() skeletonRows = 1;
  @Input() notifications?: {
    count$: Observable<number>;
    showBadge: boolean;
  };

  @Output() versionClick = new EventEmitter<void>();
  @Output() notificationsClick = new EventEmitter<void>();

  public get isPhone() {
    return ['none', 'sm', 'md'].includes(
      this._utilsService.currentTailwindMediaQuery()
    );
  }

  public get skeletonRowsIterable() {
    return Array(this.skeletonRows).fill(0);
  }

  public get availableItems() {
    return {
      top: this.topItems.filter((item) => !item.hidden),
      bottom: this.bottomItems.filter((item) => !item.hidden),
    };
  }

  private get _hasActiveElement(): boolean {
    return (
      ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '') &&
      document.activeElement?.getAttribute('type') !== 'checkbox'
    );
  }

  private get _isInModal() {
    return !!document.querySelector('.modal-container');
  }

  constructor(
    // public capacitor: CapacitorService,
    private _gestureCtrl: GestureController,
    private _utilsService: UtilsService
  ) {
    this._gestureCtrl
      .create(
        {
          el: document.body,
          threshold: 15,
          gestureName: 'openDrawer',
          onMove: (ev) => {
            if (this._hasActiveElement || this._isInModal) {
              return;
            }

            if (ev.deltaX > 75) {
              this.drawerController.nativeElement.checked = true;
              this.drawerController.nativeElement.dispatchEvent(
                new Event('change')
              );
            }
          },
        },
        true
      )
      .enable();
  }

  public handleNotificationsClick() {
    // this.capacitor.itemClickedHapticFeedback();
    this.notificationsClick.emit();
  }

  public handleDrawerControllerClick() {
    // this.capacitor.itemClickedHapticFeedback();
  }

  // public disableScroll(v: Event) {
  //   const isChecked = (v.target as HTMLInputElement).checked;

  //   if (isChecked) {
  //     disableBodyScroll(document.body);
  //     return;
  //   }

  //   enableBodyScroll(document.body);
  // }
}
