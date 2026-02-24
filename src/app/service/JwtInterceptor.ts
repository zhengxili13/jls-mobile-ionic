import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { RestService } from '../service/rest.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    private isTokenRefreshing = false;
    private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private rest: RestService;

    constructor(private injector: Injector) {
        setTimeout(() => {
            this.rest = injector.get(RestService);
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.attachTokenToRequest(request)).pipe(
            tap((event: HttpEvent<any>) => {
                // Response received — add event handling here if needed
            }),
            catchError((err): Observable<any> => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401:
                            return this.handleHttpResponseError(request, next);
                        case 400:
                            return <any>this.rest.logout();
                        default:
                            return throwError(() => err);
                    }
                } else {
                    return throwError(() => err);
                }
            })
        );
    }

    // Method to handle http error response
    private handleHttpResponseError(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;

            // Reset the subject so concurrent requests wait for the new token
            this.tokenSubject.next(null);

            return this.rest.getNewRefreshToken1({}).pipe(
                switchMap((tokenResponse: any) => {
                    if (tokenResponse) {
                        const { token, username, expiration, roles, refresh_token } = tokenResponse.authToken;
                        this.tokenSubject.next(token);
                        localStorage.setItem('loginStatus', '1');
                        localStorage.setItem('jwt', token);
                        localStorage.setItem('username', username);
                        localStorage.setItem('expiration', expiration);
                        localStorage.setItem('userRole', roles);
                        localStorage.setItem('refreshToken', refresh_token);
                        return next.handle(this.attachTokenToRequest(request));
                    }
                    return <any>this.rest.logout();
                }),
                catchError(() => {
                    return <any>this.rest.logout();
                }),
                finalize(() => {
                    this.isTokenRefreshing = false;
                })
            );
        } else {
            this.isTokenRefreshing = false;
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(() => next.handle(this.attachTokenToRequest(request)))
            );
        }
    }

    private attachTokenToRequest(request: HttpRequest<any>) {
        const token = localStorage.getItem('jwt');
        return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
}