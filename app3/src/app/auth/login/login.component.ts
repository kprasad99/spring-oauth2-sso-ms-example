import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'k-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService) { }

  ngOnInit() {
    // reset login status
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
    this.auth.logout().subscribe(e => {
      this.cookieService.deleteAll();
      this.login();
    },
      e => {
        this.cookieService.deleteAll();
        this.login();
      }
    );
  }

  login() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = this.route.snapshot.queryParamMap.get('access_token');
    if (currentUser && currentUser.token) {
      this.router.navigateByUrl(this.returnUrl);
    } else if (token && token !== 'null') {
      localStorage.setItem('currentUser', JSON.stringify({
        token
      }));
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.http.get<any>('assets/client.config.json').subscribe(e => {
        const params = new HttpParams().set('grant_type', 'implicit')
          .set('client_id', e.client)
          .set('response_type', 'token')
          .set('state', e.state)
          .set('scope', 'read')
          .set('redirect_uri', encodeURI(location.origin + '/#/login?'));
        location.href = e.url + '?' + params.toString();
      });
    }

  }
}
