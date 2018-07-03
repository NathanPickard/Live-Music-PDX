import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ArtistsComponent } from './artists/artists.component';
import { VenuesComponent } from './venues/venues.component';

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
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
