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
    headers = headers.append('Authorization', 'Basic ' + btoa(`${clientId}:${secret}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams().set('username', username).set('password', password).set('grant_type', 'password').set('scope', 'read');
    return this.http.post<T>('/oauth/token', params.toString(), {
      headers,
      observe: 'response'
    });
  }

  public logout<T>() {
    this.http.get('/logout', {}).subscribe();
  }
}
