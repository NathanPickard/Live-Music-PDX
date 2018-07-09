import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenuesComponent } from './venues.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenueEditComponent } from './venue-edit/venue-edit.component';
import { VenueStartComponent } from './venue-start/venue-start.component';


const venuesRoutes: Routes = [
  {
    path: '', component: VenuesComponent, children: [
      { path: '', component: VenueStartComponent },
      { path: 'new', component: VenueEditComponent },
      { path: ':id', component: VenueDetailComponent },
      { path: ':id/edit', component: VenueEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(venuesRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class VenuesRoutingModule { }