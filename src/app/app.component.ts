import { DOCUMENT } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { SSRBaseComponent } from './constructors/ssr.base.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends SSRBaseComponent {
  private _sw = inject(SwUpdate);
  private _toastr = inject(ToastrService);
  public updateAvailable$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(DOCUMENT) document: Document) {
    super();
    if (!this.isPlatformBrowser || !this._sw.isEnabled) {
      return;
    }
    this._sw.checkForUpdate().then((r) => {
      if (!r) {
        return;
      }
      const ref = this._toastr.info('Applico nuovo aggiornamento... ');

      ref.onHidden.subscribe(() => location.reload());
    });
  }
}
