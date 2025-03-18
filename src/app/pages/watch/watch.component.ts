import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import Hls from 'hls.js';
import { ToastrService } from 'ngx-toastr';
import Plyr from 'plyr';
import { catchError, Subject } from 'rxjs';
import { SSRBaseComponent } from '../../constructors/ssr.base.component';
import { IXtreamVODInfoResponse } from '../../interfaces/xtream.interface';
import { XtreamService } from '../../services/xtream.service';

declare global {
  interface Window {
    hls: any;
    player: any;
  }
}

@Component({
  selector: 'spectrum-watch',
  imports: [RouterModule, NgClass],
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

  public override componentInitialized(): void {
    this._initPlyr();

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
        this.videoInfo$.next(data.info);
        this.player.poster = data.info.backdrop_path[0] || data.info.cover_big;
      });
  }

  public get returnUrl() {
    return this._route.snapshot.queryParamMap.get('returnUrl');
  }

  public get videoUrl() {
    const v = this._route.snapshot.queryParamMap.get('v');
    return `${this._xtream.config.baseUrl}/live/${this._xtream.config.auth.username}/${this._xtream.config.auth.password}/${v}.ts`;

    // return 'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8';
  }

  public ngAfterViewInit() {
    if (!this.isPlatformBrowser) {
      return;
    }

    if (!Hls.isSupported()) {
      console.error('HLS.js is not supported');
      return;
    }

    // For more Hls.js options, see https://github.com/dailymotion/hls.js
    const hls = new Hls();

    hls.loadSource(this.videoUrl);

    hls.attachMedia(this.playerContainer.nativeElement);
    window.hls = hls;

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('Manifest Parsed');
      this.player.volume = 1;
      this.player?.play();
    });

    // Handle changing captions
    this.player?.on('languagechange', () => {
      // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      setTimeout(
        () => (hls.subtitleTrack = this.player?.currentTrack || 0),
        50
      );
    });

    // Expose player so it can be used from the console
    window.player = this.player;
  }

  private _initPlyr() {
    this.player = new Plyr('#plyrID', {
      captions: { active: true },
    });

    this.player.on('controlsshown', () => {
      this.controlsShown = true;
    });

    this.player.on('controlshidden', () => {
      this.controlsShown = false;
    });
  }
}
