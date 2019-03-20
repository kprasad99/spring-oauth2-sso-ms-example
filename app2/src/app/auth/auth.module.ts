import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {
  MatCardModule, MatRippleModule, MatInputModule,
  MatButtonModule, MatToolbarModule, MatSidenavModule,
  MatIconModule, MatMenuModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { H401Interceptor } from './interceptors/h401.interceptor';
import { TokenClearInterceptor } from './interceptors/token-clear.interceptor';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  exports: [LoginComponent],
  imports: [
    CommonModule,
    MatCardModule, MatRippleModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TokenClearInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: H401Interceptor, multi: true },
        CookieService
      ]
    };
  }
}
