import { Component } from '@angular/core';


import { AuthConfig, OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'http://localhost:8080/oauth/authorize',

  loginUrl: 'http://localhost:8080/login',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200/' + '/index.html',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'uiClient',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'read,write'
};


@Component({
  selector: 'k-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app2';

  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
