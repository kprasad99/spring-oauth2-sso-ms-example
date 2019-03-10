import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { OAuthModule, OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';

import { tap } from 'rxjs/operators';

export function initializeOauthConfig(oauthService: OAuthService, http: HttpClient) {
  return (): Promise<any> => {
    return http.get<any>('./assets/oauth.config.json').pipe(tap(r => {
      const authConfig: AuthConfig = {
        issuer: r.oauthServer,
        redirectUri: window.location.origin + '/index.html',
        clientId: r.clientId
      };
      oauthService.configure(authConfig);
      oauthService.tokenValidationHandler = new JwksValidationHandler();
      oauthService.loadDiscoveryDocumentAndTryLogin();
    })).toPromise();

  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeOauthConfig, deps: [OAuthService, HttpClient], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
