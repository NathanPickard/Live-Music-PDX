import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { VenuesRoutingModule } from './venue-routing.module';

import { VenuesComponent } from './venues.component';
import { VenueStartComponent } from './venue-start/venue-start.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueItemComponent } from './venue-list/venue-item/venue-item.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { VenueDetailComponent, VenueDetailDialog } from './venue-detail/venue-detail.component';

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
        ReactiveFormsModule,
        SharedModule,
        VenuesRoutingModule
    ]
})

export class VenuesModule { }
