import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Venue } from './venue.model';

@Injectable()
export class VenueService {
  venuesChanged = new Subject<Venue[]>();

  private venues: Venue[] = [
    new Venue(
      'Hawthorne Theater',
      'Portland, OR',
      'Southeast location'
    ),
    new Venue(
      'Crystal Ballroom',
      'Portland, OR',
      'Southwest location'
    )
  ];

  setVenues(venues: Venue[]) {
    this.venues = venues;
    this.venuesChanged.next(this.venues.slice());
  }

  getVenues() {
    return this.venues.slice();
  }

  getVenue(index: number) {
    return this.venues[index];
  }

  addVenue(venue: Venue) {
    this.venues.push(venue);
    this.venuesChanged.next(this.venues.slice());
  }

  updateVenue(index: number, newVenue: Venue) {
    this.venues[index] = newVenue;
    this.venuesChanged.next(this.venues.slice());
  }

  deleteVenue(index: number) {
    this.venues.splice(index, 1);
    this.venuesChanged.next(this.venues.slice());
  }

}