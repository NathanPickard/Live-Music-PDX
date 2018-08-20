import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { VenuesModule } from './venues/venues.module';
import { AuthModule } from './auth/auth.module';
import { SearchService } from './shared/search.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AuthModule,
    VenuesModule,
    CoreModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [SearchService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
