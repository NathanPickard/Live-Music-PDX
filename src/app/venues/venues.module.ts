import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VenuesComponent } from './venues.component';
import { VenueStartComponent } from './venue-start/venue-start.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueItemComponent } from './venue-list/venue-item/venue-item.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { VenueDetailComponent, VenueDetailDialog } from './venue-detail/venue-detail.component';
import { VenuesRoutingModule } from './venue-routing.module';

@NgModule({
  declarations: [
    VenuesComponent,
    VenueListComponent,
    VenueItemComponent,
    VenueStartComponent,
    VenueEditComponent,
    VenueDetailComponent,
    VenueDetailDialog
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VenuesRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    FlexLayoutModule
  ],
  entryComponents: [VenueDetailDialog]
})

export class VenuesModule { }
