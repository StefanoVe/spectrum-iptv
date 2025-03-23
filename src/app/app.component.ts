import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject, tap } from 'rxjs';
import { SSRBaseComponent } from './constructors/ssr.base.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends SSRBaseComponent {
  private _sw = inject(SwUpdate);
  public updateAvailable$ = new BehaviorSubject<boolean>(false);
  public showContent$ = this.updateAvailable$.pipe(
    tap((result) => {
      if (!result) {
        return;
      }
      setTimeout(() => {
        location.reload();
      }, 1500);
    })
  );

  constructor(@Inject(DOCUMENT) document: Document) {
    super();
    if (!this.isPlatformBrowser || !this._sw.isEnabled) {
      return;
    }
    this._sw.checkForUpdate().then((r) => {
      this.updateAvailable$.next(r);
    });
  }
}
