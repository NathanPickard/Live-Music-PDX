import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { VenuesComponent } from './venues.component';
import { VenueStartComponent } from './venue-start/venue-start.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueItemComponent } from './venue-list/venue-item/venue-item.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenuesRoutingModule } from './venue-routing.module';

@NgModule({
  declarations: [
    VenuesComponent,
    VenueListComponent,
    VenueItemComponent,
    VenueStartComponent,
    VenueEditComponent,
    VenueDetailComponent
  ],
  imports: [
    CommonModule,
    VenuesRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule
  ]
})

export class VenuesModule { }