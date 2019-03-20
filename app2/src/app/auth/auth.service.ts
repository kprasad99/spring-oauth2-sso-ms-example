import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public login<T>(): Observable<HttpResponse<T>> {
    let headers = new HttpHeaders();
    const clientId = 'client_2';
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('grant_type', 'implicit')
      .set('client_id', 'client_2').set('response_type', 'token')
      .set('scope', 'read');
    return this.http.post<T>('/oauth/authorize', params.toString(), {
      headers,
      observe: 'response'
    });
  }

  public logout<T>() {
    this.cookieService.deleteAll();
    return this.http.get('/logout', { observe: 'response', withCredentials: true });
  }
}
