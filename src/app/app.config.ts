import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTailwindToasts } from './modules/tailwind-toasts/tailwind-toasts.module';
import { provideXtreamService } from './services/xtream.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideTailwindToasts(),
    provideAnimations(),
    provideXtreamService(),
    provideHttpClient(),
  ],
};
