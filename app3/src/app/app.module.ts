import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatMenuModule,
  MatIconModule,
  MatRippleModule,
  MatInputModule,
  MatToolbarModule, MatSidenavModule, MatButtonModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AuthModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatMenuModule, MatIconModule, MatRippleModule, MatInputModule, MatToolbarModule, MatSidenavModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
