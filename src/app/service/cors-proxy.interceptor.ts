import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * Rewrites API requests through a CORS proxy when configured.
 * Use when the backend does not send Access-Control-Allow-Origin for your origin (e.g. GitHub Pages).
 * Set environment.CORS_PROXY to a proxy base URL (e.g. 'https://corsproxy.io/?') or leave empty to disable.
 */
@Injectable()
export class CorsProxyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const proxy = environment.CORS_PROXY;
    if (!proxy || typeof proxy !== 'string' || !proxy.trim()) {
      return next.handle(request);
    }
    const apiBase = environment.SERVER_API_URL;
    if (!request.url.startsWith(apiBase)) {
      return next.handle(request);
    }
    const proxiedUrl = proxy.trim().replace(/\/?$/, '') + encodeURIComponent(request.url);
    return next.handle(request.clone({ url: proxiedUrl }));
  }
}
