import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    VenuesRoutingModule,
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
  entryComponents: [VenueDetailDialog]
})

export class VenuesModule { }