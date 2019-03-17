import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login<T>(username: string, password: string): Observable<HttpResponse<T>> {
    let headers = new HttpHeaders();
    const clientId = 'client_2';
    const secret = 'secret';
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('grant_type', 'implicit').set('client_id', 'client_2').set('response_type', 'token').set('scope', 'read');
    return this.http.post<T>('/oauth/authorize', params.toString(), {
      headers,
      observe: 'response'
    });
  }

  public logout<T>() {
    this.http.get('/oauth/revoke_token', {}).subscribe();
  }
}
