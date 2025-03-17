import { AsyncPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  tap,
} from 'rxjs';
import { SSRBaseComponent } from '../../constructors/ssr.base.component';

import { XtreamCatalog } from '../../interfaces/xtream.interface';

@Component({
  selector: 'spectrum-search',
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, NgClass],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent extends SSRBaseComponent {
  @Input() streams$: Observable<XtreamCatalog> = new Observable();
  @Output() value = new EventEmitter<string>();

  public searchResults$ = new BehaviorSubject<XtreamCatalog>([]);
  public searchBarPlaceholder$ = new BehaviorSubject<string>('');

  public searchValue = new FormControl({
    value: '',
    disabled: true,
  }) as FormControl<string>;
  public loading = true;

  override componentInitialized() {
    if (!this.isPlatformBrowser) {
      return;
    }

    this.searchValue.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.value.emit(value || '');
    });

    combineLatest([
      this.streams$.pipe(
        tap((streams) => {
          const randomIndex = Math.floor(Math.random() * streams.length);
          this.searchBarPlaceholder$.next(
            streams[randomIndex]?.name || 'Ottengo risultati...'
          );

          if (streams.length) {
            this.searchValue.enable();
            this.loading = false;
            return;
          }
        })
      ),
      this.searchValue.valueChanges,
    ])
      .pipe(
        debounceTime(300),
        map(([streams, searchValue]) => {
          if (!searchValue || searchValue?.length < 3) {
            return [];
          }
          return streams.filter((stream) => {
            return stream.name
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          });
        }),
        tap((searchResults) => {
          this.searchResults$.next(searchResults);
        })
      )
      .subscribe();
  }
}
