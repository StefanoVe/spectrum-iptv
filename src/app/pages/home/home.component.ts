import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { NavComponent, NavItem } from '../../components/nav/nav.component';
import { SearchComponent } from '../../components/search/search.component';
import { SSRBaseComponent } from '../../constructors/ssr.base.component';
import { XtreamCatalog } from '../../interfaces/xtream.interface';
import { LoadingComponent } from '../../modules/loading/loading.component';
import { XtreamService } from '../../services/xtream.service';

@Component({
  imports: [SearchComponent, NavComponent, AsyncPipe, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends SSRBaseComponent {
  public xtream = inject(XtreamService);
  public router = inject(Router);

  public availableStreams$ = new BehaviorSubject<XtreamCatalog>([]);

  public topNav: NavItem[] = ROUTES;
  public loading = true;

  override componentInitialized(): void {
    this.titleService.setTitle('Home | Spectrum (IPTV)');

    if (!this.isPlatformBrowser) {
      return;
    }

    this.xtream.catalog$
      .pipe(
        take(1),
        tap((v) => this.availableStreams$.next(v)),
        switchMap(() => this.xtream.getCatalog()),
        tap((catalog) => {
          this.loading = false;
          this.availableStreams$.next(catalog);
          this.xtream.catalog$.next(catalog);
        })
      )
      .subscribe();
  }

  public playItem(item: XtreamCatalog[0]): void {
    this.router.navigate(['/watch'], {
      queryParams: {
        v: item.stream_id,
        returnUrl: this.router.url,
      },
    });
  }
}

const ROUTES = [
  {
    hidden: false,
    label: 'Home',
    path: '/home',
    icon: [
      'M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z',
    ],
  },
  {
    hidden: false,
    label: 'Continua a guardare',
    path: '/watchine',
    icon: [
      'M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z',
    ],
  },
  {
    hidden: false,
    label: 'La mia lista',
    path: '/my-list',
    icon: [
      'm11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z',
    ],
  },
];
