import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { VenuesModule } from './venues/venues.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { SearchService } from './shared/search.service';
import { DataStorageService } from './shared/data-storage.service';
import { SideNavService } from './core/side-nav.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    VenuesModule,
    CoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxPaginationModule
  ],
  providers: [
    SearchService,
    AuthService,
    DataStorageService,
    AuthGuard,
    SideNavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
