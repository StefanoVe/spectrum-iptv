import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { TailwindFormsModule } from '../../modules/tailwind-forms/tailwind-forms.module';
import { UtilsService } from '../../services/utils.service';
import { XtreamService } from '../../services/xtream.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, TailwindFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private _xtream = inject(XtreamService);
  private _toastr = inject(ToastrService);
  private _router = inject(Router);
  private _utils = inject(UtilsService);

  public form = new FormGroup({
    url: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {
    if (!this._utils.isBrowser) {
      return;
    }
    this._tryConnection();
  }

  async onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const { url, username, password } = this.form.value;

    if (!url || !username || !password) {
      return;
    }

    this._xtream.setConfig({
      baseUrl: url,
      auth: { username, password },
    });

    this._tryConnection();
  }

  private _tryConnection() {
    if (!this._xtream.config?.baseUrl?.length || !this._xtream.config?.auth) {
      return;
    }
    this._xtream
      .getAccountInfo()
      .pipe(
        tap((r) => {
          this._toastr.success('Login effettuato');
          this._router.navigate(['/']);
        }),
        catchError((error: HttpErrorResponse) => {
          this._xtream.clearConfig();
          this._toastr.error('Credenziali non valide');
          return of();
        })
      )
      .subscribe();
  }
}
