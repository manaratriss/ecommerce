import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withViewTransitions } from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import {
  BrowserAnimationsModule,
  provideAnimations
} from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from "./core/interceptor/loading.interceptor";
import { headersInterceptor } from "./core/interceptor/headers.interceptor";
import { errorsInterceptor } from "./core/interceptor/errors.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([loadingInterceptor,headersInterceptor,errorsInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule)
  ]
}; // importProvidersFrom(BrowserAnimationsModule)
