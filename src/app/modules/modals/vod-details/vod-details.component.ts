import { AsyncPipe, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { RatingComponent } from '../../../components/rating/rating.component';
import { ModalBaseComponent } from '../../../constructors/modal.base.component';
import {
  IXtreamVODInfoResponse,
  XtreamCatalog,
} from '../../../interfaces/xtream.interface';
import { XtreamService } from '../../../services/xtream.service';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'spectrum-vod-details',
  imports: [AsyncPipe, NgIf, RatingComponent, LoadingComponent],
  templateUrl: './vod-details.component.html',
  styleUrl: './vod-details.component.scss',
})
export class VodDetailsComponent extends ModalBaseComponent<number> {
  private _xtream = inject(XtreamService);
  @Input({ required: true }) vod!: XtreamCatalog[0];

  @Output() watchStream = new EventEmitter<number>();

  public vodDetails$ = new Subject<IXtreamVODInfoResponse>();

  override componentInitialized(): void {
    this._xtream[this.vod.type === 'movie' ? 'getMovieInfo' : 'getSeriesInfo'](
      this.vod.type === 'movie' ? this.vod.stream_id : this.vod.series_id
    ).subscribe((response) => this.vodDetails$.next(response));
  }
}
