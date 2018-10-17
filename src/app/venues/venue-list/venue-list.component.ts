import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Venue } from '../venue.model';
import { VenueService } from '../venue.service';
import { SearchService } from '../../shared/search.service';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit, OnDestroy {
  constructor(private venueService: VenueService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute) { }

  venues: Venue[];
  subscription: Subscription;

  foundVenues: any[];
  venueFound: boolean = false;
  searching: boolean = false;
  searchQuery: string;

  foundVenueName: string;
  foundVenueAddress: string;
  foundVenueDescription: string;
  foundVenueId: number;

  name: string;
  address: string;
  description: string;
  id: number;

  venueEvents: any[];

  searchVenueForm: FormGroup;

  ngOnInit() {
    this.subscription = this.venueService.venuesChanged
      .subscribe(
        (venues: Venue[]) => {
          this.venues = venues;
        }
      );
    this.venues = this.venueService.getVenues();

    this.searchVenueForm = new FormGroup({
      'searchQuery': new FormControl(null, Validators.required)
    });
  }

  handleSuccess(data) {
    this.venueFound = true;
    this.foundVenues = data.resultsPage.results.venue;
    console.log(data.resultsPage.results.venue);
  }

  handleVenueEventsSuccess(data) {
    this.venueEvents = data.resultsPage.results.event;
    console.log(this.venueEvents);
  }

  handleError(error) {
    console.log(error);
  }

  onNewVenue() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // searchVenues(query: string) {
  //   this.searching = true;
  //   return this.searchService.getVenues(query).subscribe(
  //     data => this.handleSuccess(data),
  //     // data => console.log(data),
  //     error => this.handleError(error),
  //     () => this.searching = false
  //   );
  // }

  searchVenues() {
    this.searching = true;
    const query = this.searchVenueForm.value.searchQuery;
    console.log(query);
    return this.searchService.getVenues(query).subscribe(
      data => this.handleSuccess(data),
      // data => console.log(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  getSearchVenueEvents(foundVenueId) {
    this.searching = true;
    return this.searchService.getSelectedVenueEvents(foundVenueId).subscribe(
      data => this.handleVenueEventsSuccess(data),
      error => this.handleError(error),
      () => this.searching = false
    );
  }

  addVenueToList(foundVenueName: string, foundVenueAddress: string, foundVenueDescription: string, foundVenueId: number) {
    this.name = foundVenueName;
    this.address = foundVenueAddress;
    this.description = foundVenueDescription;
    this.id = foundVenueId;

    console.log(this.foundVenueName, this.foundVenueAddress, this.foundVenueDescription, this.foundVenueId);

    this.venueService.addVenue(new Venue(this.name, this.address, this.description, this.id));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
