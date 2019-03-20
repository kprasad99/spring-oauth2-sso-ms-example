


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenClearInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(req => {
            if (request.url === '/oauth/revoke_token') {
                localStorage.removeItem('currentUser');
                this.cookieService.delete('JSESSIONID');
            }
        }));
    }
}
