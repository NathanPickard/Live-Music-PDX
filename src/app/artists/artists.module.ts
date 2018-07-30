import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ArtistsComponent } from './artists.component';
import { ArtistStartComponent } from './artist-start/artist-start.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistDetailComponent, ArtistDetailDialog } from './artist-detail/artist-detail.component';
import { ArtistItemComponent } from './artist-list/artist-item/artist-item.component';
import { ArtistsRoutingModule } from './artist-routing.module';

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
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ArtistsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  entryComponents: [ArtistDetailDialog]
})

export class ArtistsModule { }


