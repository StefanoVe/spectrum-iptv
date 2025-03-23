import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  isDevMode,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Plyr from 'plyr';
import { catchError, Subject } from 'rxjs';
import { SSRBaseComponent } from '../../constructors/ssr.base.component';
import { IXtreamVODInfoResponse } from '../../interfaces/xtream.interface';
import { LoadingComponent } from '../../modules/loading/loading.component';
import { XtreamService } from '../../services/xtream.service';

declare global {
  interface Window {
    hls: any;
    player: any;
  }
}

@Component({
  selector: 'spectrum-watch',
  imports: [RouterModule, NgClass, LoadingComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss',
})
export class WatchComponent extends SSRBaseComponent implements AfterViewInit {
  @ViewChild('plyrID') playerContainer!: ElementRef<HTMLVideoElement>;

  private _xtream = inject(XtreamService);
  private _route = inject(ActivatedRoute);
  private _sanitizer = inject(DomSanitizer);
  private _toastr = inject(ToastrService);

  public videoInfo$ = new Subject<IXtreamVODInfoResponse['info']>();

  public player!: Plyr;
  public controlsShown = false;
  public loading = false;

  public videoUrl: string = '';

  public override componentInitialized(): void {
    this._xtream
      .getVODInfo(this._route.snapshot.queryParamMap.get('v') || '')
      .pipe(
        catchError((e) => {
          this._toastr.error(e, "Couldn't load stream", {
            disableTimeOut: true,
          });

          return [];
        })
      )
      .subscribe((data) => {
        console.log(data);
        this._setVideoData(data);
      });
  }

  public get returnUrl() {
    return this._route.snapshot.queryParamMap.get('returnUrl');
  }

  public ngAfterViewInit() {
    this._initPlyr();

    if (!this.isPlatformBrowser) {
      return;
    }

    // if (!Hls.isSupported()) {
    //   console.error('HLS.js is not supported');
    //   return;
    // }

    // // For more Hls.js options, see https://github.com/dailymotion/hls.js
    // const hls = new Hls();

    // hls.loadSource(this.videoUrl);

    // hls.attachMedia(this.playerContainer.nativeElement);
    // window.hls = hls;

    // hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //   console.log('Manifest Parsed');
    //   this.player.volume = 1;
    //   this.player?.play();
    // });

    // Handle changing captions
    // this.player?.on('languagechange', () => {
    // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
    // setTimeout(
    //   () => (hls.subtitleTrack = this.player?.currentTrack || 0),
    //   50
    // );
    // });

    // Expose player so it can be used from the console
    window.player = this.player;
  }

  private _setVideoData(data: IXtreamVODInfoResponse) {
    this.videoInfo$.next(data.info);
    this.titleService.setTitle(data.movie_data.name + ' | Spectrum (IPTV)');
    const videoUrl = this._xtream.buildStreamURL(
      data.movie_data.stream_id,
      data.movie_data.container_extension,
      'movie'
    );

    this.player.source = {
      type: 'video',
      title: data.movie_data.name,
      sources: [
        {
          src: videoUrl,
          provider: 'html5',
        },
      ],
      previewThumbnails: {
        src: data.info.backdrop_path || data.info.cover_big,
      },
      poster: data.info.backdrop_path?.[0] || data.info.movie_image,
    };
  }

  private _initPlyr() {
    this.player = new Plyr('#plyrID', {
      captions: { active: true },
      debug: isDevMode(),
      autoplay: !isDevMode(),
    });

    this.player.elements.container?.style.setProperty('height', '100dvh');
    this.player.elements.container?.style.setProperty('width', '100vw');
    this.player.elements.container?.style.setProperty('position', 'fixed');

    this.player.on('controlsshown', () => {
      this.controlsShown = true;
    });

    this.player.on('controlshidden', () => {
      this.controlsShown = false;
    });

    this.player.on('waiting', (event) => {
      this.loading = true;
    });

    this.player.on('canplay', (event) => {
      this.loading = false;
    });
  }
}
