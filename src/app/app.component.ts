import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  private utils = inject(UtilsService);
  title = 'Spectrum (IPTV)';

  ngOnInit() {}
}
