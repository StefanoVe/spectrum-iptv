import {
  Component,
  ComponentRef,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Subject } from 'rxjs';

export const baseModalComponentProviders = [];

export interface IBaseModalOptions {}

@Component({
  template: '',
})
export class ModalBaseComponent<Submitted = any> implements OnInit {
  @Input({ required: true }) cf!: ComponentRef<ModalBaseComponent>;
  @Input() baseModalOptions?: IBaseModalOptions;
  @Input() isClosing = false;

  @Output() destroyed$ = new Subject<void>();

  public submitted = new Subject<Submitted>();

  public get parentElement() {
    return (this.cf.location.nativeElement as HTMLElement)
      .parentElement as HTMLElement;
  }

  public ngOnInit() {
    this.componentInitialized();
  }

  public componentInitialized(): void {
    return;
  }

  /**
   * This method is called when the modal is closed. It should be overridden by the child component with its own logic.
   */
  public onClose(): void {
    return;
  }

  @HostListener('document:keydown.escape')
  async close(config?: { skipLifecycle?: boolean; timeout?: number }) {
    this.isClosing = true;

    new Promise((resolve) =>
      setTimeout(() => {
        if (!config?.skipLifecycle) {
          this.onClose();
        }
        this.cf.destroy();
        this.destroyed$.next();
        this.destroyed$.complete();
        this.submitted.complete();
        resolve(void 0);
      }, config?.timeout || 200)
    );
  }
}
