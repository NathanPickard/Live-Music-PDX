import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { VenuesModule } from './venues/venues.module';

@NgModule({
  declarations: [
    AppComponent,
    // ArtistsComponent,
    // VenuesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    VenuesModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
