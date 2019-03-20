


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenClearInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req).pipe(
            tap(
                event => {
                    status = '';
                    if (event instanceof HttpResponse) {
                        const response: HttpResponse<any> = event;
                        const url: string = response.url || '';
                        if (url.endsWith('/logout')) {
                            this.clearToken();
                        }
                    }
                },
                error => {
                    const url: string = error.url || '';
                    if (url.endsWith('/logout') || url.endsWith('/login?logout')) {
                        this.clearToken();
                    }
                }
            )
        );
    }
    private clearToken() {
        localStorage.removeItem('currentUser');
        this.cookieService.delete('JSESSIONID');
    }
}

