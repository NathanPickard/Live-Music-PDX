import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ArtistsRoutingModule } from './artist-routing.module';

import { ArtistsComponent } from './artists.component';
import { ArtistStartComponent } from './artist-start/artist-start.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistDetailComponent, ArtistDetailDialog } from './artist-detail/artist-detail.component';
import { ArtistItemComponent } from './artist-list/artist-item/artist-item.component';

import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistStartComponent,
    ArtistListComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    ArtistItemComponent,
    ArtistDetailDialog
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ArtistsRoutingModule
  ],
  providers: [
    AuthService
  ],

  entryComponents: [ArtistDetailDialog]
})

export class ArtistsModule { }


