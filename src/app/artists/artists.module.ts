import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ArtistsComponent } from './artists.component';
import { ArtistStartComponent } from './artist-start/artist-start.component';
import { ArtistListComponent, ArtistSnackbar } from './artist-list/artist-list.component';
import { ArtistEditComponent } from './artist-edit/artist-edit.component';
import { ArtistDetailComponent, ArtistDetailDialog } from './artist-detail/artist-detail.component';
import { ArtistItemComponent } from './artist-list/artist-item/artist-item.component';
import { ArtistsRoutingModule } from './artist-routing.module';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [
    ArtistsComponent,
    ArtistStartComponent,
    ArtistListComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    ArtistItemComponent,
    ArtistDetailDialog,
    ArtistSnackbar
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
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  providers: [
    AuthService
  ],

  entryComponents: [ArtistDetailDialog, ArtistSnackbar]
})

export class ArtistsModule { }


