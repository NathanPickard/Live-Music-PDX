import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { NgxPaginationModule } from 'ngx-pagination';

import { AboutComponent } from './about/about.component';
import { HeaderComponent, LogoutSnackbar } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { ArtistService } from '../artists/artist.service';
import { VenueService } from '../venues/venue.service';
import { AuthService } from '../auth/auth.service';
import { SideNavService } from './side-nav.service';
// import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoutSnackbar,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    MatNativeDateModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    ArtistService,
    VenueService,
    AuthService,
    SideNavService,
    MatDatepickerModule,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ],
  entryComponents: [LogoutSnackbar]
})
export class CoreModule { }
