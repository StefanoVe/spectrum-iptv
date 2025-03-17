import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TailwindFormsModule } from '../../modules/tailwind-forms/tailwind-forms.module';
import { XtreamService } from '../../services/xtream.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, TailwindFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private _xtream = inject(XtreamService);

  public form = new FormGroup({
    url: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
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
  }
}
