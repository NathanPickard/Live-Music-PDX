import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesComponent } from './venues.component';
import { VenueListComponent } from './venue-list/venue-list.component';

@NgModule({
  declarations: [
    VenuesComponent,
    VenueListComponent
  ],
  imports: [
    CommonModule,
  ]
})

export class VenuesModule { }